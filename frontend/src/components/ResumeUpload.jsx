
import { useRef, useState } from "react";
import { FileText, UploadCloud, X, CheckCircle2 } from "lucide-react";

export default function ResumeUpload({ file, setFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF resume.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Your PDF must be smaller than 10 MB.");
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = (event) => {
    event.stopPropagation();
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={`w-full rounded-2xl border border-dashed p-6 text-left transition sm:p-8 ${
          dragging
            ? "border-violet-400 bg-violet-500/10"
            : "border-[#383b52] bg-[#0c0f19] hover:border-violet-400/60 hover:bg-violet-500"
        }`}
      >
        {file ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <FileText size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="truncate">{file.name}</span>
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              </div>

              <p className="mt-1 text-xs text-[#969bb3]">
                {(file.size / 1024 / 1024).toFixed(2)} MB · PDF document
              </p>
              <p className="mt-2 text-xs text-violet-300">
                Click to replace file
              </p>
            </div>

            <span
              role="button"
              tabIndex={0}
              aria-label="Remove resume"
              onClick={removeFile}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  removeFile(event);
                }
              }}
              className="rounded-lg p-2 text-[#969bb3] hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <UploadCloud size={28} />
            </div>

            <p className="font-semibold text-white">
              Drop your resume here
            </p>

            <p className="mt-2 text-sm text-[#969bb3]">
              or click to browse your files
            </p>

            <span className="mt-4 rounded-full border border-[#303349] px-3 py-1 text-[11px] text-[#969bb3]">
              PDF ONLY · MAX 10 MB
            </span>
          </div>
        )}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
