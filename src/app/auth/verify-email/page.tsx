"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiService } from "../../../services/api";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("Verifying...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (token) {
      apiService
        .verifyEmail(token)
        .then(() => {
          setMessage("Email verified successfully! You can now log in.");
          setTimeout(() => router.push("/auth/login"), 3000);
        })
        .catch((err) => {
          setMessage(
            err instanceof Error
              ? err.message
              : "Verification failed. Please try again."
          );
        });
    } else {
      setMessage("Invalid token.");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
