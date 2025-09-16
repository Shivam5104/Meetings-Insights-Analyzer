'use client';

import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AuthProvider } from '@/hooks/use-auth';
import { useHistory, HistoryProvider } from '@/hooks/use-history';
import type { MeetingHistoryItem } from '@/lib/types';

function HistoryPageContent() {
  const { history } = useHistory();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting History</CardTitle>
            <CardDescription>Review your past meeting analyses for this session. This will be cleared on page refresh.</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
               <p className="text-muted-foreground text-center py-8">You have no saved meeting analyses yet.</p>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Link href={`/history/${item.id}`} key={item.id} className="block hover:bg-muted/50 rounded-lg p-4 border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
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
      <HistoryProvider>
        <HistoryPageContent />
      </HistoryProvider>
    </AuthProvider>
  )
}
