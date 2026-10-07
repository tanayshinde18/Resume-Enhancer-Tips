from src.chains import get_resume_suggestions
from src.resume_parser import extract_text_from_resume
from src.scraping import scrape_job_description
from src.text_processing import clean_text, prepare_analysis_text


def analyze_resume(job_description: str, resume_file) -> dict:
    job_description = clean_text(job_description)
    if not job_description:
        return {"error": "Please provide a job description."}

    resume_text = extract_text_from_resume(resume_file)
    if not resume_text:
        return {"error": "Failed to extract text from the uploaded resume."}

    limited_job_description, limited_resume_text = prepare_analysis_text(
        job_description,
        resume_text,
    )
    return get_resume_suggestions(limited_job_description, limited_resume_text)


def analyze_resume_against_job_url(url: str, resume_file) -> dict:
    job_description = scrape_job_description(url)
    if not job_description:
        return {"error": "Failed to extract job description from the provided URL."}

    return analyze_resume(job_description, resume_file)


def analyze_resume_against_job_text(job_description: str, resume_file) -> dict:
    return analyze_resume(job_description, resume_file)
