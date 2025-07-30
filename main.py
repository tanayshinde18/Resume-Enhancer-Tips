# main.py

from utils import scrape_job_description, extract_text_from_resume
from chains import get_resume_suggestions

def analyze_resume_against_job(url: str, resume_file) -> dict:
    """
    Controller function that handles the entire workflow:
    - Scrapes job description from URL
    - Extracts text from resume PDF
    - Gets improvement suggestions via LLM

    Args:
        url (str): Job posting link
        resume_file (UploadedFile or BytesIO): PDF resume file

    Returns:
        dict: Suggestions and feedback for resume improvements
    """
    # Step 1: Scrape job description
    job_description = scrape_job_description(url)
    if not job_description:
        return {"error": "Failed to extract job description from the provided URL."}

    # Step 2: Extract resume text
    resume_text = extract_text_from_resume(resume_file)
    if not resume_text:
        return {"error": "Failed to extract text from the uploaded resume."}

    # Step 3: Get suggestions from LLM
    suggestions = get_resume_suggestions(job_description, resume_text)
    return suggestions
