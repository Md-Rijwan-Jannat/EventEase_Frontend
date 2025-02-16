import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { axiosInstance } from "../lib/axiosInstance";
import { toast } from "sonner";
import { TUser } from "../types";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/";

interface AuthContextType {
  authUser: TUser | null;
  isUserLoading: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  loginFn: (data: FieldValues) => Promise<void>;
  registerFn: (data: FieldValues) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: FieldValues) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<TUser | null>(null);
  const [isUserLoading, setAuthUserLoading] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const router = useRouter();

  const connectSocket = useCallback(
    (userId: string) => {
      if (socket?.connected) return;

      const newSocket = io(BASE_URL, {
        query: { userId },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (userIds) => {
        setOnlineUsers(userIds);
      });
    },
    [socket]
  );

  const disconnectSocket = useCallback(() => {
    if (socket?.connected) {
      socket.disconnect();
      setSocket(null); // Clear the socket after disconnecting
    }
  }, [socket]);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthUserLoading(true);
      try {
        const res = await axiosInstance.get("/auth/check-auth");

        if (res.data.success) {
          setAuthUser(res.data.data);
          connectSocket(res.data._id);
          setAuthUserLoading(false);
        }
      } catch (error) {
        console.log("Error in checkAuth:", error);
        setAuthUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    return () => {
      disconnectSocket(); // Ensure that socket is disconnected when the component is unmounted
    };
  }, [connectSocket, disconnectSocket]);

  const registerFn = async (data: FieldValues) => {
    setIsSigningUp(true);
    try {
      const res = await axiosInstance.post("/auth/register", data);

      if (res.data.success) {
        setAuthUser(res.data.data);
        toast.success("Account created successfully");
        localStorage.setItem("accessToken", res.data.accessToken);
        connectSocket(res.data.data._id);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  const loginFn = async (data: FieldValues) => {
    setIsLoggingIn(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        setAuthUser(res.data.data);
        toast.success("Logged in successfully");
        localStorage.setItem("accessToken", res.data.accessToken);
        connectSocket(res.data.data._id);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");
      if (res.data.success) {
        setAuthUser(null);
        toast.success("Logged out successfully");
        disconnectSocket(); // Disconnect socket when logged out
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const updateProfile = async (data: FieldValues) => {
    setIsUpdatingProfile(true);
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      setAuthUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isUserLoading,
        isSigningUp,
        isLoggingIn,
        isUpdatingProfile,
        isCheckingAuth,
        onlineUsers,
        loginFn: loginFn,
        registerFn: registerFn,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
