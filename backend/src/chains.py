from langchain_core.exceptions import OutputParserException
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from pydantic import ValidationError

# from backend.src.config import GROQ_API_KEY, GROQ_MODEL_NAME
# from backend.src.schemas import ResumeAnalysis

from src.config import GROQ_API_KEY, GROQ_MODEL_NAME
from src.schemas import ResumeAnalysis

parser = JsonOutputParser(pydantic_object=ResumeAnalysis)

prompt = PromptTemplate(
    template="""
You are an expert career assistant. Compare the resume with the job description
and return practical resume improvement feedback.

JOB DESCRIPTION:
----------------
{job_description}

RESUME TEXT:
------------
{resume_text}

TASK:
- Compare the resume with the job description.
- Estimate a match_score from 0 to 100.
- List missing skills or keywords.
- List strong matches already present in the resume.
- Provide actionable suggestions for improvements.
- Provide example rewritten resume bullets the candidate can adapt.
- Keep every list concise and practical.
- Return only valid JSON using this exact structure:

{format_instructions}
""",
    input_variables=["job_description", "resume_text"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)


def get_resume_suggestions(job_description: str, resume_text: str) -> dict:
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY is missing. Add it to your .env file and try again."}

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name=GROQ_MODEL_NAME,
        temperature=0.2,
    )

    chain = prompt | llm | parser

    try:
        result = chain.invoke(
            {
                "job_description": job_description,
                "resume_text": resume_text,
            }
        )
        return ResumeAnalysis.model_validate(result).model_dump()
    except OutputParserException as e:
        print(f"[ERROR] Failed to parse LLM output: {e}")
        return {"error": "Failed to parse suggestions. Try again."}
    except ValidationError as e:
        print(f"[ERROR] LLM output did not match expected schema: {e}")
        return {"error": "Received incomplete suggestions. Try again."}
    except Exception as e:
        print(f"[ERROR] Failed to get resume suggestions: {e}")
        return {"error": "Failed to analyze resume. Check your API key, model name, and network connection."}
