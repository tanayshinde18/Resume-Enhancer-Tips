
import { CheckCircle2, CircleAlert, Sparkles } from "lucide-react";

function SkillGroup({ title, skills, type, description }) {
  const items = Array.isArray(skills) ? skills : [];
  const positive = type === "positive";

  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-amber-400/10 text-amber-300"
          }`}
        >
          {positive ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
        </div>

        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-[#969bb3]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.length ? (
          items.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`rounded-lg border px-3 py-2 text-xs ${
                positive
                  ? "border-emerald-400/20 bg-emerald-400 text-black"
                  : "border-amber-400/20 bg-amber-400 text-black"
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-[#969bb3]">
            No items returned for this section.
          </p>
        )}
      </div>
    </div>
  );
}

export default function SkillsSection({ strongMatches, missingSkills }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={17} className="text-violet-300" />
        <h3 className="font-semibold text-white">Skills intelligence</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <SkillGroup
          title="Strong matches"
          skills={strongMatches}
          type="positive"
          description="Skills identified as matching the target role."
        />
        <SkillGroup
          title="Skills to strengthen"
          skills={missingSkills}
          type="gap"
          description="Requirements identified as missing or not sufficiently represented."
        />
      </div>
    </section>
  );
}
