from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from backend.src.analyzer import (
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