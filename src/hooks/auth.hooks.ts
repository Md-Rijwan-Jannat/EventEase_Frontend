import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser, logout, registerUser } from "../service/autrhService";

// Register User
export const useUserRegistrationMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Your registration was successful", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Login User
export const useUserLoginMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("Login successful", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Logout User
export const useUserLogoutMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGOUT"],
    mutationFn: async () => await logout(),
    onSuccess: () => {
      toast.success("Logout successful", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
