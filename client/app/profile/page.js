"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function safeDecodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }, []);

  const decoded = useMemo(() => (token ? safeDecodeToken(token) : null), [token]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your profile");
      router.push("/login");
      return;
    }

    const bootstrap = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(res.data);
        setForm((prev) => ({
          ...prev,
          name: res.data?.name || decoded?.name || "",
          email: res.data?.email || decoded?.email || "",
        }));
      } catch (e) {
        console.error(e);
        toast.error("Failed to load profile");
        if (e?.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token, router, decoded?.name, decoded?.email]);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          name: form.name,
          email: form.email,
          ...(form.password ? { password: form.password } : {}),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      setMe(res.data?.user || me);
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      toast.success("Profile updated");
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-600 mb-8">
        Manage your account details and password.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-semibold">{me?.name || decoded?.name || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{me?.email || decoded?.email || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">Role</p>
              <p className="font-semibold capitalize">{decoded?.role || "user"}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Update details</h2>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full p-2 border rounded-md"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Change password (optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    placeholder="Leave empty to keep current"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded-md"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, confirmPassword: e.target.value }))
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

