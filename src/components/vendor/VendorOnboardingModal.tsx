import { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import { ALL_SPECIALTIES, type Specialty } from "@/lib/vendorData";

interface VendorOnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = ["Details", "Specialties", "Capacity"];

export default function VendorOnboardingModal({ open, onClose }: VendorOnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState<Specialty[]>([]);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const toggleSkill = (s: Specialty) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const reset = () => {
    setStep(0);
    setSkills([]);
    setDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">Add Workshop</h3>
          <button onClick={reset} className="text-white/30 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DFFF00]">
              <Check className="h-7 w-7 text-black" />
            </div>
            <p className="mt-4 text-sm text-white/80">Workshop submitted for verification.</p>
            <button
              onClick={reset}
              className="mt-6 rounded-[0.5rem] bg-[#DFFF00] px-5 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="my-6 flex items-center gap-2">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      i <= step ? "bg-[#DFFF00] text-black" : "bg-white/10 text-white/40"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-xs ${i <= step ? "text-white" : "text-white/30"}`}>
                    {label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px flex-1 ${i < step ? "bg-[#DFFF00]" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div className="space-y-3">
                <Field label="Workshop Name" placeholder="e.g. Ironclad Forge" />
                <Field label="Owner Name" placeholder="Full name" />
                <Field label="Contact Email" placeholder="owner@workshop.com" type="email" />
                <Field label="Phone" placeholder="+91 ..." type="tel" />
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ALL_SPECIALTIES.map((s) => {
                  const on = skills.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className={`rounded-[0.5rem] border px-3 py-2 text-xs font-medium transition-colors ${
                        on
                          ? "border-[#DFFF00]/40 bg-[#DFFF00]/15 text-[#DFFF00]"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/60">Max Concurrent Slots</label>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    defaultValue={3}
                    className="mt-2 w-full accent-[#DFFF00]"
                  />
                </div>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[1rem] border border-dashed border-white/15 bg-white/5 px-4 py-8 text-center">
                  <Upload className="h-6 w-6 text-white/30" />
                  <span className="text-xs text-white/60">Upload verification documents</span>
                  <span className="text-[10px] text-white/30">PDF, PNG or JPG (placeholder)</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            )}

            <div className="mt-6 flex justify-between gap-3">
              <button
                onClick={() => (step === 0 ? reset() : setStep((s) => s - 1))}
                className="rounded-[0.5rem] border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5"
              >
                {step === 0 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={() => (step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1))}
                className="rounded-[0.5rem] bg-[#DFFF00] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
              >
                {step === STEPS.length - 1 ? "Submit" : "Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-[0.5rem] border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#DFFF00]/40"
      />
    </div>
  );
}
