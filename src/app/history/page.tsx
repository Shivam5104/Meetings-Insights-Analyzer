'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AuthProvider } from '@/hooks/use-auth';
import { getMeetingHistory } from '@/app/actions';
import type { MeetingHistoryItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function HistoryPageContent() {
  const [history, setHistory] = useState<MeetingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const historyItems = await getMeetingHistory();
        setHistory(historyItems);
      } catch (error) {
        console.error("Failed to fetch meeting history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting History</CardTitle>
            <CardDescription>Review your past meeting analyses.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
               <div className="space-y-4">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="p-4 border rounded-lg space-y-3">
                     <Skeleton className="h-5 w-3/4" />
                     <Skeleton className="h-4 w-1/4" />
                   </div>
                 ))}
               </div>
            ) : history.length === 0 ? (
               <p className="text-muted-foreground text-center py-8">You have no saved meeting analyses yet.</p>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Link href={`/history/${item.id}`} key={item.id} className="block hover:bg-muted/50 rounded-lg p-4 border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge variant={
                        item.sentiment === 'positive' ? 'default' :
                        item.sentiment === 'negative' ? 'destructive' : 'secondary'
                      }>
                        {item.sentiment}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


export default function HistoryPage() {
  return (
    <AuthProvider>
      <HistoryPageContent />
    </AuthProvider>
  )
}
