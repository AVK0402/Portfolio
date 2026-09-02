import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  /** Visible label — mandatory; placeholder is never a label. */
  label: string;
  /** Helper or error text, linked via aria-describedby. */
  hint?: ReactNode;
  error?: string;
};

/**
 * Accessible text field — the canonical form input. All future forms
 * use this (or primitives like it) so label association, descriptions
 * and error announcement are structural, never hand-rolled (WCAG
 * 1.3.1, 3.3.1, 3.3.2, 3.3.3).
 */
export function TextField({ label, hint, error, className, ...props }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
    props["aria-describedby"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("flex flex-col gap-(--space-3xs)", className)}>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-muted-foreground text-sm">
          {hint}
        </p>
      )}
      <input
        {...props}
        id={id}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          "border-border rounded-md border px-(--space-sm) py-(--space-2xs)",
          error && "border-red-600",
        )}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
