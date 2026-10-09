
import { Lightbulb, ArrowUpRight } from "lucide-react";

export default function SuggestionsSection({ suggestions }) {
  const items = Array.isArray(suggestions) ? suggestions : [];

  return (
    <section className="panel p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400 text-violet-300">
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-white">AI recommendations</h3>
          <p className="mt-1 text-sm text-[#969bb3]">
            Actionable ways to improve your application.
          </p>
        </div>
      </div>

      {items.length ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {items.map((suggestion, index) => (
            <article
              key={index}
              className="panel-hover rounded-xl border border-[#292d40] bg-[#0c0f19] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-violet-300">
                  INSIGHT {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight size={16} className="text-[#777d95]" />
              </div>
              <p className="text-sm leading-6 text-[#d1d1df]">
                {suggestion}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-[#969bb3]">
          No recommendations were returned.
        </p>
      )}
    </section>
  );
}
