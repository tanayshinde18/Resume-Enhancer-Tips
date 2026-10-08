from io import BytesIO

import pymupdf

from backend.src.resume_parser import extract_text_from_resume


def test_extract_text_from_resume_reads_pdf_text():
    doc = pymupdf.open()
    page = doc.new_page()
    page.insert_text((72, 72), "Python developer resume")
    pdf_bytes = doc.tobytes()
    doc.close()

    text = extract_text_from_resume(BytesIO(pdf_bytes))

    assert "Python developer resume" in text


def test_extract_text_from_resume_returns_empty_for_invalid_pdf():
    assert extract_text_from_resume(BytesIO(b"not a pdf")) == ""
