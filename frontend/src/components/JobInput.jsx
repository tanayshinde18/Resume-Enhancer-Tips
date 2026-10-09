
import { Link2, FileText, ClipboardPaste } from "lucide-react";

export default function JobInput({
  mode,
  setMode,
  jobUrl,
  setJobUrl,
  jobDescription,
  setJobDescription,
}) {
  const modes = [
    { id: "url", label: "Job URL", icon: Link2 },
    { id: "text", label: "Paste description", icon: ClipboardPaste },
  ];

  return (
    <section className="panel p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-300">
          <FileText size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-white">Target opportunity</h2>
          <p className="mt-1 text-sm text-[#969bb3]">
            Tell Resumind which role you want to target.
          </p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-[#272b3d] bg-[#0a0d16] p-1.5">
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm transition ${
              mode === id
                ? "border border-violet-400/20 bg-violet-500/15 font-medium text-violet-200"
                : "text-[#969bb3] hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {mode === "url" ? (
        <div>
          <label
            htmlFor="job-url"
            className="mb-2 block text-sm text-[#c4c5d5]"
          >
            Job posting link
          </label>

          <input
            id="job-url"
            type="url"
            value={jobUrl}
            onChange={(event) => setJobUrl(event.target.value)}
            placeholder="https://company.com/careers/role"
            className="w-full rounded-xl border border-[#303349] bg-[#0a0d16] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#666b83] focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/10"
          />

          <p className="mt-2 text-xs text-[#777d95]">
            Paste a publicly accessible job posting URL.
          </p>
        </div>
      ) : (
        <div>
          <label
            htmlFor="job-description"
            className="mb-2 block text-sm text-[#c4c5d5]"
          >
            Job description
          </label>

          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the role responsibilities, required skills, qualifications..."
            rows={7}
            className="w-full resize-y rounded-xl border border-[#303349] bg-[#0a0d16] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-[#666b83] focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/10"
          />

          <p className="mt-2 text-xs text-[#777d95]">
            Include the requirements and responsibilities for the best comparison.
          </p>
        </div>
      )}
    </section>
  );
}
