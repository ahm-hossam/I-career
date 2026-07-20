import { Button } from "@i-career/ui";

export default function DashboardHome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">I-career Admin</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Dashboard — under construction.</p>
      <Button variant="secondary">Sign in</Button>
    </div>
  );
}
