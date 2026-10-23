"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EnvelopeBack } from "./envelope-back";
import { WaxSeal } from "./wax-seal";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const DURATION = {
  backdrop: 0.45,
  form: 0.7,
} as const;

const gpuLayer = "letter-motion-layer transform-gpu";
const modalWidthClass = "w-full max-w-[min(56rem,94vw)]";

function motionTransition(seconds: number, reduceMotion: boolean | null) {
  if (reduceMotion === true) {
    return { type: "tween" as const, duration: 0.01 };
  }
  return {
    type: "tween" as const,
    duration: seconds,
    ease: [0.33, 0, 0.2, 1] as [number, number, number, number],
  };
}

export function LetterContact() {
  const reduceMotion = useReducedMotion();
  const [formVisible, setFormVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setMessage("");
    setError(null);
    setTurnstileToken(null);
    setIsSending(false);
    turnstileRef.current?.reset();
  }, []);

  const openForm = () => {
    if (formVisible || isSending) return;
    setFormVisible(true);
  };

  const closeForm = useCallback(() => {
    if (isSending) return;
    setFormVisible(false);
  }, [isSending]);

  const onFormExitComplete = useCallback(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (!formVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formVisible, closeForm]);

  useEffect(() => {
    if (!formVisible) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [formVisible]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!turnstileToken) {
      setError("Please complete the verification check.");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, turnstileToken }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setIsSending(false);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }
      setFormVisible(false);
    } catch {
      setError("Network error. Try again.");
      setIsSending(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {formVisible ? (
          <motion.button
            type="button"
            aria-label="Close correspondence"
            className="fixed inset-0 z-40 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition(DURATION.backdrop, reduceMotion)}
            onClick={closeForm}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence onExitComplete={onFormExitComplete}>
        {formVisible ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="correspondence-title"
            className={`fixed left-1/2 top-1/2 z-50 max-h-[min(90vh,900px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto ${modalWidthClass} rounded-sm border border-ink/25 bg-paper-sheet p-6 shadow-xl sm:p-8 ${gpuLayer}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={motionTransition(DURATION.form, reduceMotion)}
          >
              <span id="correspondence-title" className="sr-only">
                Correspondence form
              </span>
              <form
                className="space-y-3 text-left font-serif text-sm"
                onSubmit={submit}
              >
                <p className="font-display text-center text-xl font-semibold">
                  Correspondence
                </p>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-ink/60">
                    Name
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    className="mt-1 w-full border border-ink/25 bg-white px-2 py-2"
                    disabled={isSending}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-ink/60">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="mt-1 w-full border border-ink/25 bg-white px-2 py-2"
                    disabled={isSending}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wide text-ink/60">
                    Message
                  </span>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    className="mt-1 w-full resize-y border border-ink/25 bg-white px-2 py-2"
                    disabled={isSending}
                  />
                </label>
                {siteKey ? (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={siteKey}
                    onSuccess={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                  />
                ) : (
                  <p className="text-xs text-amber-900">
                    Add Turnstile keys to <code className="text-[11px]">.env.local</code>{" "}
                    (see <code className="text-[11px]">.env.example</code> for Cloudflare test
                    keys).
                  </p>
                )}
                {error ? (
                  <p className="text-xs text-red-800" role="alert">
                    {error}
                  </p>
                ) : null}
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSending || !siteKey}
                    className="flex-1 border border-ink bg-ink px-3 py-2.5 text-xs uppercase tracking-wider text-paper disabled:opacity-50"
                  >
                    {isSending ? "Sending…" : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={isSending}
                    className="border border-ink/40 px-3 py-2.5 text-xs uppercase tracking-wider disabled:opacity-50"
                  >
                    Fold away
                  </button>
                </div>
              </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex w-full flex-col items-center px-2 py-10">
        <div className="flex h-[13.5rem] w-full max-w-[20rem] flex-col items-center justify-end">
          <EnvelopeBack
            onOpen={openForm}
            disabled={formVisible || isSending}
            stamp={<WaxSeal size={76} />}
          />
          <p
            className={`mt-4 min-h-[1.25rem] text-center font-serif text-xs italic text-ink/65 transition-opacity duration-200 ${formVisible ? "opacity-0" : "opacity-100"}`}
            aria-hidden={formVisible}
          >
            Tap the envelope to open
          </p>
        </div>
      </div>
    </>
  );
}
