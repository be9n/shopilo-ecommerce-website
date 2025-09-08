"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { useAuth } from "@/context/AuthProvider";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";
import SocialAuthButtons from "./SocialAuthButtons";
import { ApiError } from "@/types/global";

export default function LoginForm({
  isRegister = false,
  setIsRegister,
}: {
  isRegister: boolean;
  setIsRegister: (isRegister: boolean) => void;
}) {
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const callbackUrl = searchParams?.get("callbackUrl") || currentPath;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(useLoginSchema(isRegister)),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    try {
      await signin({ type: "credentials", credentials: data });

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

          {isRegister && (
            <FormField
              control={form.control}
              name="name"
              render={({ field: { value, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Full Name*"
                      className="shadow-none py-6 px-4"
                      disabled={isSubmitting || isSocialLoading}
                      autoComplete="name"
                      value={value as string}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
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
                    disabled={isSubmitting || isSocialLoading}
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
                    disabled={isSubmitting || isSocialLoading}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-2 max-w-full w-full">
            <Button
              type="submit"
              className="main-button"
              disabled={isSubmitting || isSocialLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin translate-x-1/2 translate-y-1/2" />
                  {isRegister ? "Creating account..." : "Logging in..."}
                </>
              ) : isRegister ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </Button>
            <Button
              type="button"
              className="cursor-pointer w-[100%] md:w-[50%] rounded-full py-6
              bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
              disabled={isSubmitting || isSocialLoading}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sign in instead" : "Create an account"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="my-5 text-center text-sm">Or sign in with:</div>
      <SocialAuthButtons
        setIsSocialLoading={setIsSocialLoading}
        setError={setError}
      />
    </div>
  );
}
