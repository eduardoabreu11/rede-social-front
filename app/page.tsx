"use client";

import Link from "next/link";

import {
  BookOpen,
  Code2,
  Megaphone,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Header } from "./_components/header";
import { api } from "./config/api";

interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}

function getRoomIcon(slug: string) {
  if (slug === "engenharia-software") {
    return Code2;
  }

  if (slug === "avisos-gerais") {
    return Megaphone;
  }

  return BookOpen;
}

function getRoomColor(slug: string) {
  if (slug === "engenharia-software") {
    return "bg-violet-100 text-violet-700";
  }

  if (slug === "avisos-gerais") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-blue-100 text-blue-700";
}

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  async function loadRooms() {
    try {
      const response = await api.get("/rooms");

      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-slate-900">
            Escolha uma sala
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Entre em uma comunidade para ver postagens, dúvidas e avisos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const Icon = getRoomIcon(room.slug);
            const color = getRoomColor(room.slug);

            return (
              <div
                key={room.id}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon size={38} />
                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  {room.name}
                </h3>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {room.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-slate-500">
                  <Users size={20} />

                  <span className="text-sm font-medium">
                    Grupo público
                  </span>
                </div>

                <Link
                  href={`/cursos/${room.slug}`}
                  className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-violet-600 text-base font-semibold text-white transition hover:bg-violet-700"
                >
                  Entrar na sala
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-violet-200 bg-violet-50 p-6">
          <h4 className="text-xl font-bold text-violet-900">
            Respeito em primeiro lugar
          </h4>

          <p className="mt-2 text-violet-700">
            Mantenha um ambiente saudável e colaborativo. Seja respeitoso e
            ajude seus colegas.
          </p>
        </div>
      </section>
    </main>
  );
}