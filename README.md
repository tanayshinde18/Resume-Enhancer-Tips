# Resumind --- AI-Powered Resume Analyzer

Resumind is a personal AI/ML showcase project that helps users compare a
resume with a target job description and identify areas for improvement.
It is built as a portfolio and learning project---not as a production
SaaS platform.

The application uses a React frontend and a FastAPI backend. The backend
handles resume/job-description analysis and connects to the
language-model workflow; the frontend presents the results in a more
interactive interface.

> **Project status:** Portfolio/demo project. Hosted deployments may
> have limited availability, request capacity, or response times
> depending on the hosting platform and AI provider.

## Features

-   **Resume upload:** Upload a resume PDF for analysis.
-   **Job description input:** Provide the job description to use as the
    target for comparison.
-   **AI-powered analysis:** Generate resume feedback based on the
    supplied resume and job description.
-   **Match insights:** Review the resume/job fit and the matching
    information returned by the analysis.
-   **Skill suggestions:** Identify relevant skills or areas that may
    need attention.
-   **Improvement recommendations:** Get actionable suggestions for
    strengthening the resume for the target role.
-   **Responsive React interface:** Use a dedicated frontend instead of
    the original Streamlit interface.
-   **API-based architecture:** Keep the React UI and FastAPI analysis
    service separate.

The analysis is intended to support resume review. It does not guarantee
ATS performance, interview selection, or employment outcomes.

## Tech Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   CSS and project UI components

### Backend

-   Python
-   FastAPI
-   Pydantic
-   Resume/PDF text extraction utilities
-   LangChain-based LLM workflow
-   Groq API (if configured in the backend environment)

### Deployment

-   GitHub for source control
-   Render for hosting the frontend and backend

> The exact packages and AI provider configuration are defined by the
> dependency files and environment configuration in this repository.

## Architecture

``` text
Resumind/
├── backend/
│   ├── main.py
│   ├── src/
│   │   ├── analyzer.py
│   │   ├── chains.py
│   │   ├── config.py
│   │   ├── resume_parser.py
│   │   ├── schemas.py
│   │   ├── scraping.py
│   │   └── text_processing.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── components/
│           ├── Navbar.jsx
│           ├── ResumeUpload.jsx
│           ├── JobInput.jsx
│           ├── AnalyzeButton.jsx
│           └── ...
│
└── README.md
```

This is a representative overview of the project structure; individual
component names may change as the project evolves.

## Run Locally

### Prerequisites

-   Python 3.10 or newer (use the version supported by the deployed
    backend and its dependencies)
-   Node.js and npm
-   A Groq API key, if the configured backend uses Groq
-   Git

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with your repository URL and folder name.

### 2. Configure the backend

``` bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**

``` powershell
.\.venv\Scripts\Activate.ps1
```

**Windows Command Prompt**

``` bat
.venv\Scripts\activate
```

**macOS/Linux**

``` bash
source .venv/bin/activate
```

Install the backend dependencies:

``` bash
pip install -r requirements.txt
```

Create a local `.env` file using `.env.example` as the template, then
add the required values. For example, if the current backend
configuration expects it:

``` env
GROQ_API_KEY=your_groq_api_key
```

Use the exact variable names required by `backend/.env.example` and
`backend/src/config.py`. Do not commit `.env` or expose API keys in the
frontend.

Start the API from the `backend/` directory:

``` bash
uvicorn main:app --reload
```

The API will normally be available at `http://127.0.0.1:8000`. FastAPI's
interactive API documentation is normally available at
`http://127.0.0.1:8000/docs`.

### 3. Configure and run the frontend

Open a second terminal:

``` bash
cd frontend
npm install
```

Create the frontend environment file only if the frontend configuration
requires one. Set the API base URL to the local FastAPI server using the
variable name expected by the Vite application. Vite-exposed environment
variables generally need the `VITE_` prefix.

For example, if the project uses `VITE_API_BASE_URL`:

``` env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the development server:

``` bash
npm run dev
```

Vite will print the local URL in the terminal (commonly
`http://localhost:5173`).

> **Configuration note:** The examples above are common defaults, not a
> substitute for the variable names used by the current code. Check the
> frontend's API configuration and `backend/.env.example` before running
> the project.

## Build the Frontend

From the `frontend/` directory:

``` bash
npm run build
```

Vite creates the production build in `frontend/dist/` by default.

To preview the built frontend locally:

``` bash
npm run preview
```

## Deploying on Render

Resumind is intended for a lightweight portfolio/demo deployment. Deploy
the frontend and backend as separate Render services so each can be
configured independently.

### Backend --- Web Service

-   **Root directory:** `backend`

-   **Build command:**

    ``` bash
    pip install -r requirements.txt
    ```

-   **Start command:**

    ``` bash
    uvicorn main:app --host 0.0.0.0 --port $PORT
    ```

-   **Environment variables:** Add the AI-provider key and any other
    required settings from `backend/.env.example` in the Render
    dashboard.

-   **CORS:** Configure the backend to allow requests from the deployed
    frontend's exact origin.

If the backend uses a different entry point or requires a different
import path, adjust the start command to match the current code.

### Frontend --- Static Site

-   **Root directory:** `frontend`

-   **Build command:**

    ``` bash
    npm install && npm run build
    ```

-   **Publish directory:**

    ``` text
    dist
    ```

-   **Environment variables:** Set the frontend API base URL to the
    deployed backend URL using the exact variable name expected by the
    Vite code. Rebuild/redeploy after changing Vite environment
    variables.

After deployment, test the complete flow from the public frontend:
upload a sample PDF, enter a job description, run the analysis, and
verify that the results render correctly. Also check the backend logs if
a request fails.

## Security and Demo Limitations

-   **Never commit secrets.** Keep `.env` files and API keys out of Git.
    Commit only sanitized example configuration such as `.env.example`.
-   **Use sample resumes.** For public demonstrations, use fictional or
    anonymized resumes rather than uploading sensitive personal
    information.
-   **Treat AI output as guidance.** Generated feedback may be
    incomplete, inaccurate, or biased. Review suggestions before using
    them.
-   **No production guarantees.** This project is not presented as a
    secure, scalable, or compliant commercial service. It does not
    promise uptime, data retention controls, ATS accuracy, or employment
    outcomes.
-   **Third-party dependencies apply.** Availability, rate limits, and
    usage costs depend on the hosting provider and configured AI API.
-   **Job description sources can change.** If scraping is enabled,
    websites may block requests or change their page structure. Pasting
    the job description directly is a useful alternative.

## Troubleshooting

**The frontend cannot reach the backend** - Confirm the API base URL is
correct. - Confirm the backend is running and reachable. - Check CORS
settings for the frontend origin. - Inspect browser developer tools and
Render logs for the actual error.

**The analysis request fails** - Verify the required API key and
environment variables. - Check the backend logs for validation, parsing,
provider, or rate-limit errors. - Try a text-based PDF and a shorter job
description to isolate input-related problems.

**The deployed frontend uses an old API URL** - Update the frontend
environment variable in Render. - Trigger a new frontend
build/deployment because Vite environment values are typically embedded
during the build.

**The PDF produces little or no text** - The parser may not extract text
reliably from scanned/image-only PDFs. Try a text-based PDF.

## Roadmap

Possible future improvements for this showcase project include: - Better
validation and user-facing error messages - More robust handling of
different PDF layouts - Clearer explanations of match scores and skill
recommendations - Additional automated tests and deployment checks -
Improved demo documentation and screenshots

## Contributing

This repository is primarily a personal portfolio project. Suggestions,
bug reports, and small improvements are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Make and test your changes.
4.  Open a pull request describing the change.

## License

No license is specified here. Unless a license file is added to the
repository, assume that the project is shared for viewing and portfolio
purposes only and that reuse is not automatically granted.

------------------------------------------------------------------------

Built as an AI/ML and full-stack development showcase.


# The project is still in development stage 
Branch Information
The test-changes branch contains the updated project architecture, with a React-based frontend and a FastAPI backend. The main branch retains the original, simpler Streamlit-based application. The updated frontend and backend implementation is currently maintained separately in test-changes while development and deployment preparations continue.