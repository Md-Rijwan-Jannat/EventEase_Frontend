"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuthStore } from "@/src/context/useAuth";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthImagePattern from "../../ui/authImagePattern";
import EventEaseLogo from "../../ui/logo";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginFn, isLoggingIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    loginFn(data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <Card className="w-full max-w-md py-5">
          <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
            <EventEaseLogo className="hidden" />
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-default-500">Sign in to your account</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                startContent={<Mail className="text-default-400" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                startContent={<Lock className="text-default-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-default-400" />
                    ) : (
                      <Eye className="text-default-400" />
                    )}
                  </button>
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <Button
                type="submit"
                className="w-full primary-button"
                isLoading={isLoggingIn}
              >
                {isLoggingIn ? "Loading..." : "Sign In"}
              </Button>
            </form>
            <p className="text-center mt-4 text-default-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary">
                Create account
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginForm;
