import { MeetingAnalyzer } from '@/components/meeting-analyzer';
import { Logo } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold tracking-tight text-primary">
              Meeting Insights Analyzer
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <MeetingAnalyzer />
      </main>
      <footer className="container mx-auto py-6 px-4 text-center text-sm text-muted-foreground md:px-6">
        <p>&copy; {new Date().getFullYear()} Meeting Insights Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}
