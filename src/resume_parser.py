import pymupdf


def extract_text_from_resume(file) -> str:
    try:
        file.seek(0)
    except (AttributeError, OSError):
        pass

    try:
        doc = pymupdf.open(stream=file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    except Exception as e:
        print(f"[ERROR] Failed to extract resume text: {e}")
        return ""
