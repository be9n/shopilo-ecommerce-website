import { z } from "zod";

export function useLoginSchema(isRegister = false) {
  
  return z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 8 characters" }),
    ...(isRegister && {
      name: z.string().min(1, { message: "Name is required" }),
    }),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof useLoginSchema>>;
