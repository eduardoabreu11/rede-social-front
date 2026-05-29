"use client";

export function useAuth() {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  return {
    token,

    user: user
      ? JSON.parse(user)
      : null,
  };
}