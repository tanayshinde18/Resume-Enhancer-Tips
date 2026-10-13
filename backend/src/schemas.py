from typing import List

from pydantic import BaseModel, Field


class ResumeAnalysis(BaseModel):
    match_score: int = Field(
        ge=0,
        le=100,
        description="Estimated resume-to-job match score from 0 to 100.",
    )
    missing_skills: List[str] = Field(
        default_factory=list,
        description="Important skills, tools, or keywords from the job description missing from the resume.",
    )
    strong_matches: List[str] = Field(
        default_factory=list,
        description="Skills, experience, or keywords that already match the job description.",
    )
    suggestions: List[str] = Field(
        default_factory=list,
        description="Actionable resume improvements tailored to the job description.",
    )
    rewritten_bullets: List[str] = Field(
        default_factory=list,
        description="Improved example resume bullet points the candidate can adapt.",
    )
