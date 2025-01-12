"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import AuthImagePattern from "../../ui/authImagePattern";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EventEaseLogo from "../../ui/logo";
import { useAuth } from "@/src/context/useAuth";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must not exceed 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must not exceed 72 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerFn, isSigningUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerFn(data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <Card className="w-full max-w-md py-5">
          <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
            <EventEaseLogo className="hidden" />
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-default-500">
              Get started with your free account
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                startContent={<User className="text-default-400" />}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
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
                isLoading={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Create Account"}
              </Button>
            </form>
            <p className="text-center mt-4 text-default-500">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title="Welcome to EventEase"
        subtitle="EventEase is a platform for event organizers to manage their events effectively. Whether you're a small business or a large organization, we have everything you need to make your event a success."
      />
    </div>
  );
};

export default RegisterForm;
