import { Heading, Text } from "@/components/ui/container";

/**
 * Homepage placeholder — intentionally content-free.
 * This file will be replaced during the visual/experience phase;
 * all real pages should follow the pattern: route (thin) → blocks → ui.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-32">
        <Heading level={1}>Architecture foundation ready.</Heading>
        <Text muted className="mt-4">
          Content, design and experience phases follow. See docs/ARCHITECTURE.md.
        </Text>
      </div>
    </main>
  );
}
