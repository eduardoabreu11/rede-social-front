"use client";

import { Camera } from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "../_components/header";
import { Sidebar } from "../_components/sideBar";

import { api } from "../config/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setName(response.data.name);
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  }

  function handleSave() {
    alert("Ainda vamos criar a rota PUT /profile no backend.");
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <Sidebar />

      <section className="px-6 pt-32 lg:ml-72 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold">Perfil</h2>

            <p className="mt-2 text-slate-500">
              Gerencie suas informações pessoais.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
              <div className="flex flex-col items-center border-b border-slate-200 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-violet-100 text-5xl font-bold text-violet-700">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <button className="mt-6 flex items-center gap-2 rounded-xl border border-violet-200 px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50">
                  <Camera size={20} />
                  Alterar foto
                </button>

                <p className="mt-3 text-sm text-slate-400">
                  JPG, PNG ou GIF. Máx 2MB.
                </p>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <label className="mb-3 block text-lg font-semibold">
                    Nome
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-violet-500"
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    Esse será o nome exibido para outros usuários.
                  </p>

                  <div className="mt-8">
                    <label className="mb-3 block text-lg font-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="h-14 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-5 text-slate-500 outline-none"
                    />

                    <p className="mt-3 text-sm text-slate-500">
                      O email não pode ser alterado por enquanto.
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-700"
                  >
                    Salvar alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}