const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export async function analyzeResumeWithText(
  resumeFile,
  jobDescription
) {
  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  const response = await fetch(
    `${API_BASE_URL}/analyze/text`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to analyze resume.";

    try {
      const errorData = await response.json();
      errorMessage =
        errorData.detail ||
        errorData.error ||
        errorMessage;
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(errorMessage);
  }

  return response.json();
}


export async function analyzeResumeWithUrl(
  resumeFile,
  jobUrl
) {
  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("job_url", jobUrl);

  const response = await fetch(
    `${API_BASE_URL}/analyze/url`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let errorMessage = "Failed to analyze resume.";

    try {
      const errorData = await response.json();
      errorMessage =
        errorData.detail ||
        errorData.error ||
        errorMessage;
    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(errorMessage);
  }

  return response.json();
}