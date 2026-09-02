import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

/**
 * Button primitive. Styles come from semantic tokens only.
 * For navigation, use `ui/Link` — this is for actions, not links.
 */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md px-5 py-2.5 font-medium",
        variant === "primary"
          ? "bg-foreground text-background"
          : "border-border border",
        className,
      )}
      {...props}
    />
  );
}
