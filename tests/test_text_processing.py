from src.text_processing import clean_text, limit_text


def test_clean_text_normalizes_whitespace():
    assert clean_text(" Python\n\n developer\t resume ") == "Python developer resume"


def test_limit_text_trims_without_cutting_last_word():
    text = "alpha beta gamma delta"

    assert limit_text(text, 12) == "alpha beta"
