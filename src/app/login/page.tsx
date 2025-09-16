
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to access your meeting history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              {/* <ChromeIcon className="mr-2 h-4 w-4" /> */}
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
