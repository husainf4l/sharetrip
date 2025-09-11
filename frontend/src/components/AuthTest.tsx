"use client";

import { useState } from "react";
import { apiService } from "../services/api";

export default function AuthTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAuthMe = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have a token first
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("No access token found. Please log in first.");
        return;
      }

      if (token === "test-token-123") {
        setError("Test token detected. Please use a real JWT token from login.");
        return;
      }

      console.log("Testing API call to:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`);
      console.log("Using token:", token.substring(0, 20) + "...");

      const userData = await apiService.getCurrentUser();
      setResult(userData);
    } catch (err: any) {
      console.error("Full error details:", err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      // Test basic connectivity to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/theme`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResult({ backendStatus: "Connected", themeData: data });
      } else {
        setError(`Backend responded with status: ${response.status}`);
      }
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
      console.error("Backend connection test failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearToken = () => {
    localStorage.removeItem("accessToken");
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>

      <div className="space-y-4">
        <button
          onClick={testAuthMe}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Auth /me"}
        </button>

        <button
          onClick={testBackendConnection}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Backend Connection"}
        </button>

        <button
          onClick={clearToken}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Clear Token
        </button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <strong>Success:</strong>
            <pre className="mt-2 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
