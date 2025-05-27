"use client";
import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
           <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <LoginForm />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
    </div>
  );
}
