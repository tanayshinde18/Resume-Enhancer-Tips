from io import BytesIO

from src.analyzer import analyze_resume_against_job_text


def test_analyze_resume_against_job_text_rejects_empty_job_description():
    result = analyze_resume_against_job_text("", BytesIO(b""))

    assert "error" in result
    assert result["error"] == "Please provide a job description."


def test_analyze_resume_against_job_text_rejects_empty_resume():
    result = analyze_resume_against_job_text("Python developer role", BytesIO(b""))

    assert "error" in result
    assert result["error"] == "Failed to extract text from the uploaded resume."
