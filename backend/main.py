# # main.py

# from utils import scrape_job_description, extract_text_from_resume
# from src.chains import get_resume_suggestions

# def analyze_resume_against_job(url: str, resume_file) -> dict:
#     """
#     Controller function that handles the entire workflow:
#     - Scrapes job description from URL
#     - Extracts text from resume PDF
#     - Gets improvement suggestions via LLM

#     Args:
#         url (str): Job posting link
#         resume_file (UploadedFile or BytesIO): PDF resume file

#     Returns:
#         dict: Suggestions and feedback for resume improvements
#     """
#     # Step 1: Scrape job description
#     job_description = scrape_job_description(url)
#     if not job_description:
#         return {"error": "Failed to extract job description from the provided URL."}

#     # Step 2: Extract resume text
#     resume_text = extract_text_from_resume(resume_file)
#     if not resume_text:
#         return {"error": "Failed to extract text from the uploaded resume."}

#     # Step 3: Get suggestions from LLM
#     suggestions = get_resume_suggestions(job_description, resume_text)
#     return suggestions
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from src.analyzer import (
    analyze_resume_against_job_text,
    analyze_resume_against_job_url,
)


app = FastAPI(
    title="Resume Matcher AI API",
    description="AI-powered resume analysis and job matching API",
    version="1.0.0",
)


# React will run on a different origin during development/deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this to your frontend URL before production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Resume Matcher AI API is running",
        "status": "ok",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }


@app.post("/analyze/url")
async def analyze_from_url(
    job_url: str = Form(...),
    resume: UploadFile = File(...),
):
    if resume.content_type != "application/pdf":
        return {
            "error": "Only PDF resume files are supported."
        }

    resume_bytes = await resume.read()

    result = analyze_resume_against_job_url(
        job_url,
        resume_bytes,
    )

    return result


@app.post("/analyze/text")
async def analyze_from_text(
    job_description: str = Form(...),
    resume: UploadFile = File(...),
):
    if resume.content_type != "application/pdf":
        return {
            "error": "Only PDF resume files are supported."
        }

    resume_bytes = await resume.read()

    result = analyze_resume_against_job_text(
        job_description,
        resume_bytes,
    )

    return result