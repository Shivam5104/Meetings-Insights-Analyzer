import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const mockHistory = [
  { id: '1', date: '2023-10-27', title: 'Q3 Project Sync', sentiment: 'positive' },
  { id: '2', date: '2023-10-25', title: 'Marketing Brainstorm', sentiment: 'neutral' },
  { id: '3', date: '2023-10-22', title: 'Client Feedback Session', sentiment: 'negative' },
  { id: '4', date: '2023-10-20', title: 'Weekly Standup', sentiment: 'positive' },
];

export default function HistoryPage() {
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
            <div className="space-y-4">
              {mockHistory.map((item) => (
                <Link href="#" key={item.id} className="block hover:bg-muted/50 rounded-lg p-4 border">
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
