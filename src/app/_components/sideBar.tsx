"use client";

import Link from "next/link";
import { LogOut, Settings, User, Users } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-20 hidden w-72 border-r border-slate-200 bg-white p-6 lg:block">
      <Link
        href="/"
        className="flex items-center gap-4 rounded-2xl bg-violet-600 p-5 text-white transition hover:bg-violet-700"
      >
        <Users size={28} />

        <div>
          <strong>Ver outras salas</strong>

          <p className="mt-1 text-sm text-violet-100">
            Explore outras comunidades
          </p>
        </div>
      </Link>

      <div className="my-8 h-px bg-slate-200" />

      <nav className="space-y-3">
        <Link
          href="/perfil"
          className="flex items-center gap-4 rounded-xl px-3 py-3 font-medium transition hover:bg-slate-100"
        >
          <User size={22} />
          Perfil
        </Link>

        <Link
          href="/configuracoes"
          className="flex items-center gap-4 rounded-xl px-3 py-3 font-medium transition hover:bg-slate-100"
        >
          <Settings size={22} />
          Configurações
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href = "/login";
          }}
          className="
    flex w-full items-center gap-4
    rounded-xl px-3 py-3
    font-medium transition
    hover:bg-slate-100
  "
        ></button>
      </nav>
    </aside>
  );
}
