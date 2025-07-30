
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("GROQ_MODEL_NAME", "llama3-70b-8192")

# Define the output schema
parser = JsonOutputParser()

# Define the prompt template
prompt = PromptTemplate(
    template="""
You are an expert career assistant that compares a resume with a job description and returns improvement suggestions and changes to be made in the resume in JSON format.

JOB DESCRIPTION:
----------------
{job_description}

RESUME TEXT:
------------
{resume_text}

TASK:
- Compare the resume with the job description.
- List missing skills or keywords.
- Provide actionable suggestions for improvements.
-
- Format output strictly as JSON using this structure:

{format_instructions}
""",
    input_variables=["job_description", "resume_text"],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)


def get_resume_suggestions(job_description: str, resume_text: str) -> dict:
    """
    Uses the Groq LLM to analyze and suggest improvements for a resume.

    Args:
        job_description (str): Job description text scraped from the website.
        resume_text (str): Extracted plain text from uploaded resume PDF.

    Returns:
        dict: Parsed JSON suggestions (e.g., missing_skills, suggestions).
    """
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name=MODEL_NAME
    )

    chain = prompt | llm | parser

    try:
        result = chain.invoke({
            "job_description": job_description,
            "resume_text": resume_text
        })
        return result

    except OutputParserException as e:
        print(f"[ERROR] Failed to parse LLM output: {e}")
        return {"error": "Failed to parse suggestions. Try again."}
