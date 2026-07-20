import { Button } from "@i-career/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">I-career</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Public site — under construction.</p>
      <Button>Get started</Button>
    </div>
  );
}
