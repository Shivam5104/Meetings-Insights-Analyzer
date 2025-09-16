'use client';

import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist/build/pdf';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
  ).toString();
}

interface TimelineInputProps {
  onAnalyze: (rawNotes: string) => void;
  isLoading: boolean;
}

export function TimelineInput({ onAnalyze, isLoading }: TimelineInputProps) {
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;

    setFileName(file.name);
    setNotes(''); // Clear textarea when a file is chosen

    try {
      if (file.type === 'text/plain') {
        const text = await file.text();
        setNotes(text);
      } else if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setNotes(result.value);
      } else if (file.name.endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => (item as any).str).join(' ') + '\n';
        }
        setNotes(text);
      } else {
        throw new Error('Unsupported file type. Please use .txt, .docx, or .pdf');
      }
    } catch (error: any) {
      setFileName(null);
      toast({
        title: 'Error reading file',
        description: error.message || 'Could not read the selected file.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLoading) return;
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [isLoading, handleFile]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDivClick = () => {
    if (fileName) return; // Don't open file dialog if a file is already selected
    fileInputRef.current?.click();
  };
  
  const handleRemoveFile = () => {
    setFileName(null);
    setNotes('');
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      onAnalyze(notes);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" />
          <span>Upload Your Meeting Notes</span>
        </CardTitle>
        <CardDescription>
          Paste your notes, or drag and drop a .txt, .pdf, or .docx file.
          Format example: <code className="font-mono text-sm bg-muted text-muted-foreground rounded px-1 py-0.5">10:05 - Project update</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => e.target.files && handleFile(e.target.files[0])}
            className="hidden"
            accept=".txt,.pdf,.docx,.doc"
            disabled={isLoading}
          />
          <div
            className="group relative rounded-lg border-2 border-dashed border-border p-4 transition-colors hover:border-primary"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleDivClick}
          >
            {fileName ? (
               <div className="relative z-10 flex items-center justify-center min-h-[300px] text-center">
                <div>
                  <FileText className="h-16 w-16 text-primary/80 mx-auto mb-2" />
                  <p className="font-semibold">{fileName}</p>
                   <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-auto p-1" onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}>
                     <X className="h-4 w-4" />
                   </Button>
                </div>
               </div>
            ) : (
              <>
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                   <div className="text-center">
                    <UploadCloud className="h-16 w-16 text-muted-foreground/30 transition-colors group-hover:text-primary/30 mx-auto" />
                    <p className="text-muted-foreground mt-2">Click or drag & drop a file</p>
                   </div>
                </div>
                <Textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Or paste your meeting notes here..."
                  className="relative z-10 min-h-[300px] border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading}
                />
              </>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !notes.trim()}>
            {isLoading ? 'Analyzing...' : 'Analyze Meeting'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
