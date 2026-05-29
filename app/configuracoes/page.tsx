"use client";

import { Lock } from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "../_components/header";
import { Sidebar } from "../_components/sideBar";

export default function SettingsPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  function handleUpdatePassword(event: React.FormEvent) {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("As novas senhas não conferem.");
      return;
    }

    alert("Ainda vamos criar a rota PUT /profile/password no backend.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <Sidebar />

      <section className="px-6 pt-32 lg:ml-72 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold">Configurações</h2>

            <p className="mt-2 text-slate-500">
              Gerencie sua segurança e senha da conta.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-violet-100 p-4 text-violet-700">
                <Lock size={30} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Alterar senha</h3>

                <p className="mt-1 text-slate-500">
                  Atualize sua senha para manter sua conta segura.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleUpdatePassword}
              className="space-y-6"
            >
              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Senha atual
                </label>

                <input
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Nova senha
                </label>

                <input
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Confirmar nova senha
                </label>

                <input
                  type="password"
                  placeholder="Confirme sua nova senha"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  className="text-sm font-medium text-violet-600 transition hover:text-violet-700"
                >
                  Redefinir senha
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-700"
                >
                  Atualizar senha
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}