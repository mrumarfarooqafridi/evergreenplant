"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const prefillEmail = useMemo(() => params.get("email") || "", [params]);

  const [email, setEmail] = useState(prefillEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const submit = async (e) => {
    e.preventDefault();
    if (isExpired) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successfully. Please login.");
      router.push("/login");
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-2">Reset password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the OTP from your email and choose a new password.
        </p>

        {isExpired && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6 text-center">
            <p className="font-semibold">OTP Expired!</p>
            <p className="text-sm">You must enter your OTP within 60 seconds.</p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">OTP</label>
              {!isExpired ? (
                <span className="text-xs font-semibold text-primary">
                  Expires in 00:{timeLeft.toString().padStart(2, '0')}
                </span>
              ) : (
                <span className="text-xs font-semibold text-red-500">
                  Expired
                </span>
              )}
            </div>
            <input
              inputMode="numeric"
              className="w-full p-2 border rounded tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              required
              disabled={isExpired}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isExpired}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isExpired}
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary w-full ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading || isExpired}
          >
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Need a new OTP?{" "}
          <Link href="/forgot-password" className="text-primary font-semibold hover:underline">
            Send again
          </Link>
        </p>
      </div>
    </div>
  );
}

