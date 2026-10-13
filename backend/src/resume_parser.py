import pymupdf


def extract_text_from_resume(file) -> str:
    try:
        if isinstance(file, bytes):
            pdf_bytes = file
        else:
            try:
                file.seek(0)
            except (AttributeError, OSError):
                pass

            pdf_bytes = file.read()

        doc = pymupdf.open(
            stream=pdf_bytes,
            filetype="pdf",
        )

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        return text.strip()

    except Exception as e:
        print(f"[ERROR] Failed to extract text from resume: {e}")
        return ""