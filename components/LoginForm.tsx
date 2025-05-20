"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { useAuth } from "@/context/AuthProvider";
import { login } from "@/app/actions/auth";
import { Input } from "./ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/lib/auth/types";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { setUserData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    try {
      const user = await login(data);

      setUserData(user);

      // router.refresh();
      router.push(decodeURI(callbackUrl));
    } catch (error) {
      const apiError = error as ApiError;
      console.log(error);

      setError(apiError.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="p-3">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email*"
                    className="shadow-none py-6 px-4"
                    disabled={isSubmitting}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password*"
                    className="shadow-none py-6 px-4"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
