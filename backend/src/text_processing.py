from backend.src.config import MAX_JOB_DESCRIPTION_CHARS, MAX_RESUME_CHARS


def clean_text(text: str) -> str:
    return " ".join((text or "").split())


def limit_text(text: str, max_chars: int) -> str:
    cleaned = clean_text(text)
    if len(cleaned) <= max_chars:
        return cleaned
    return cleaned[:max_chars].rsplit(" ", 1)[0]


def prepare_analysis_text(job_description: str, resume_text: str) -> tuple[str, str]:
    return (
        limit_text(job_description, MAX_JOB_DESCRIPTION_CHARS),
        limit_text(resume_text, MAX_RESUME_CHARS),
    )
