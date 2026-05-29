"use client";

import Link from "next/link";

import {
  Bell,
  Code2,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  User,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export function Header() {

  const [user, setUser] =
    useState<UserData | null>(null);

  const [mounted, setMounted] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    setMounted(true);

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {

        setOpenMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  return (
    <header
      className="
        fixed left-0 right-0 top-0
        z-50 h-20 border-b
        border-slate-200 bg-white
      "
    >

      <div
        className="
          flex h-full items-center
          justify-between px-8
        "
      >

        <Link
          href="/"

          className="flex items-center gap-3"
        >

          <div
            className="
              rounded-xl bg-violet-600
              p-2 text-white
            "
          >
            <Code2 size={24} />
          </div>

          <h1 className="text-2xl font-bold">
            Campus
            <span className="text-violet-600">
              Feed
            </span>
          </h1>

        </Link>

        <div
          className="
            hidden w-[500px]
            items-center gap-3
            rounded-2xl border
            border-slate-200
            bg-slate-100
            px-4 py-3 md:flex
          "
        >

          <Search
            size={20}
            className="text-slate-500"
          />

          <input
            placeholder="
              Pesquisar posts,
              pessoas, grupos...
            "

            className="
              w-full bg-transparent
              text-sm outline-none
              placeholder:text-slate-500
            "
          />

        </div>

        <div className="flex items-center gap-5">

          <Bell size={22} />

          <MessageCircle size={22} />

          <div
            ref={menuRef}

            className="relative"
          >

            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }

              className="
                flex items-center gap-3
                rounded-2xl p-2
                transition hover:bg-slate-100
              "
            >

              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-full
                  bg-violet-200 font-bold
                  text-violet-700
                "
              >
                {mounted && user?.name
                  ? user.name
                      .charAt(0)
                      .toUpperCase()
                  : ""}
              </div>

              <div className="hidden md:block">

                <p className="font-semibold">
                  {mounted && user?.name
                    ? user.name
                    : ""}
                </p>

                <p
                  className="
                    text-xs text-slate-500
                  "
                >
                  Ver perfil
                </p>

              </div>

            </button>

            {openMenu && (

              <div
                className="
                  absolute right-0 top-16
                  w-64 rounded-2xl
                  border border-slate-200
                  bg-white p-2 shadow-xl
                "
              >

                <Link
                  href="/perfil"

                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    transition hover:bg-slate-100
                  "
                >

                  <User size={20} />

                  Perfil

                </Link>

                <Link
                  href="/configuracoes"

                  className="
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    transition hover:bg-slate-100
                  "
                >

                  <Settings size={20} />

                  Configurações

                </Link>

                <button
                  onClick={handleLogout}

                  className="
                    flex w-full items-center
                    gap-3 rounded-xl
                    px-4 py-3 text-red-600
                    transition hover:bg-red-50
                  "
                >

                  <LogOut size={20} />

                  Sair

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}