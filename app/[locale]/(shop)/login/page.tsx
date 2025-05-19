import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Shopilo",
  description: "Login to your Shopilo account",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto py-12 max-w-md">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 pb-0">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to access your account
          </p>
        </div>
        
        <LoginForm />
        
        <div className="p-6 pt-2 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 