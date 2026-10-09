
import { Check, Copy, FileText } from "lucide-react";
import { useState } from "react";

export default function BulletSuggestions({ bullets }) {
  const items = Array.isArray(bullets) ? bullets : [];
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyBullet = async (bullet, index) => {
    try {
      await navigator.clipboard.writeText(bullet);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      window.prompt("Copy your resume bullet:", bullet);
    }
  };

  return (
    <section className="panel p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
          <FileText size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-white">
            Rewritten resume bullets
          </h3>
          <p className="mt-1 text-sm leading-5 text-[#969bb3]">
            Copy useful suggestions after checking that every claim reflects
            your real experience.
          </p>
        </div>
      </div>

      {items.length ? (
        <div className="mt-5 space-y-3">
          {items.map((bullet, index) => (
            <article
              key={index}
              className="rounded-xl border border-[#292d40] bg-[#0b0e18] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10 text-xs font-semibold text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="flex-1 text-sm leading-7 text-[#d1d1df]">
                  {bullet}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => copyBullet(bullet, index)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#303349] px-3 py-2 text-xs font-medium text-[#c4c5d5] transition hover:border-violet-400/50 hover:text-white"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={14} className="text-emerald-300" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy bullet
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-[#969bb3]">
          No rewritten bullets were returned.
        </p>
      )}
    </section>
  );
}
