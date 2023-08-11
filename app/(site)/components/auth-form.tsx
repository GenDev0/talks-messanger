"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
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
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
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
      await axios
        .post("/api/register", values)
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      // NextAuth SignIn
      signIn("credentials", {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          if (callback?.ok && !callback.error) {
            toast.success("Logged In");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social SignIn
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged In");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {variant === "REGISTER" && (
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
            )}

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
          <Button
            onClick={() => socialAction("github")}
            variant={"outline"}
            className='w-full'
          >
            <BsGithub className='mr-2 text-gray-400' />
            Github
          </Button>
          <Button
            onClick={() => socialAction("google")}
            variant={"outline"}
            className='w-full'
          >
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
