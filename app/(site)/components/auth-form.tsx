"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BsGithub, BsGoogle } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator";

type VariantType = "LOGIN" | "REGISTER";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function AuthForm() {
  const [variant, setVariant] = useState<VariantType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("LOGIN");
    } else {
      setVariant("REGISTER");
    }
  }, [variant]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // Axios REGISTER
    }
    if (variant === "LOGIN") {
      // NextAuth SignIn
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social SignIn
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Username'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Email'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter a valid Email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='password'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your Password to authenticate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type='submit'
              className='bg-sky-500 hover:bg-sky-600'
            >
              {isLoading
                ? "Submitting..."
                : variant === "LOGIN"
                ? "Sign In"
                : "Register"}
            </Button>
          </form>
        </Form>
        <div className='my-6'>
          <div className='relative'>
            <Separator className='flex justify-center items-center'>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>
                  Or continue with
                </span>
              </div>
            </Separator>
          </div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          <Button variant={"outline"} className='w-full'>
            <BsGithub className='mr-2 text-gray-400' />
            Github
          </Button>
          <Button variant={"outline"} className='w-full'>
            <BsGoogle className='mr-2 text-gray-400' />
            Google
          </Button>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === "LOGIN"
              ? "New to Talks!"
              : "Already have an account ?"}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === "LOGIN" ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
