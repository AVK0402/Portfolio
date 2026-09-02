import { afterEach, describe, it, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TextField } from "@/components/ui/TextField";

afterEach(cleanup);

describe("TextField accessibility", () => {
  it("associates the label with the input", () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("links hint text via aria-describedby", () => {
    render(<TextField label="Email" hint="We never share your address." />);
    const input = screen.getByLabelText("Email");
    const hint = screen.getByText("We never share your address.");
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining(hint.id));
  });

  it("marks errors with aria-invalid and role=alert", () => {
    render(<TextField label="Email" error="Enter a valid email." />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email.");
  });
});
