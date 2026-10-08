import pytest
from pydantic import ValidationError

from backend.src.schemas import ResumeAnalysis


def test_resume_analysis_accepts_valid_payload():
    analysis = ResumeAnalysis(
        match_score=82,
        missing_skills=["Docker"],
        strong_matches=["Python"],
        suggestions=["Add measurable impact."],
        rewritten_bullets=["Built Python services that reduced manual work by 30%."],
    )

    assert analysis.match_score == 82
    assert analysis.missing_skills == ["Docker"]


def test_resume_analysis_rejects_invalid_score():
    with pytest.raises(ValidationError):
        ResumeAnalysis(match_score=120)
