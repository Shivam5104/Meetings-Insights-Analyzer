'use client';

import { useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TimelineInputProps {
  onAnalyze: (rawNotes: string) => void;
  isLoading: boolean;
}

export function TimelineInput({ onAnalyze, isLoading }: TimelineInputProps) {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(notes);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = event => {
        setNotes(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" />
          <span>Upload Your Meeting Notes</span>
        </CardTitle>
        <CardDescription>
          Paste your notes, or drag and drop a .txt file.
          Format example: <code className="font-mono text-sm bg-muted text-muted-foreground rounded px-1 py-0.5">10:05 - Project update</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group relative rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary">
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <UploadCloud className="h-16 w-16 text-muted-foreground/30 transition-colors group-hover:text-primary/30" />
            </div>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Paste your meeting notes here..."
              className="relative z-10 min-h-[300px] border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !notes.trim()}>
            {isLoading ? 'Analyzing...' : 'Analyze Meeting'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
