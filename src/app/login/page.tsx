"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "../config/api";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            const response = await api.post("/login", {
                email,
                password,
            });

            const token = response.data.token;
            const user = response.data.user;

            // SALVAR TOKEN
            localStorage.setItem(
                "token",
                token
            );

            // SALVAR USUÁRIO
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            alert("Login realizado com sucesso!");

            // REDIRECIONAR
            router.push("/");

        } catch (error: any) {

            alert(
                error.response?.data?.error ||
                "Erro ao fazer login."
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-4">

            <div
                className="
                    w-full max-w-md rounded-3xl
                    border border-blue-500/20
                    bg-[#0b1727]/95
                    p-8 shadow-[0_0_60px_rgba(59,130,246,0.15)]
                    backdrop-blur
                "
            >

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-white">
                        Entrar
                    </h1>

                    <p className="mt-2 text-sm text-blue-100/70">
                        Entre na sua conta para continuar
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-blue-100">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Digite seu email"

                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }

                            className="
                                w-full rounded-2xl
                                border border-blue-400/20
                                bg-[#101c2e]
                                px-4 py-3
                                text-white
                                outline-none
                                transition-all

                                placeholder:text-blue-100/40

                                focus:border-blue-400
                                focus:ring-4
                                focus:ring-blue-500/20
                            "
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-blue-100">
                            Senha
                        </label>

                        <input
                            type="password"
                            placeholder="Digite sua senha"

                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }

                            className="
                                w-full rounded-2xl
                                border border-blue-400/20
                                bg-[#101c2e]
                                px-4 py-3
                                text-white
                                outline-none
                                transition-all

                                placeholder:text-blue-100/40

                                focus:border-blue-400
                                focus:ring-4
                                focus:ring-blue-500/20
                            "
                        />

                    </div>

                    <button
                        type="submit"

                        className="
                            w-full rounded-2xl
                            bg-gradient-to-r
                            from-blue-500
                            to-cyan-400

                            py-3
                            font-semibold
                            text-white

                            transition-all

                            hover:scale-[1.02]
                            hover:from-blue-400
                            hover:to-cyan-300

                            active:scale-[0.99]
                        "
                    >
                        Entrar
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-sm text-blue-100/60">
                        Não possui conta?
                    </p>

                    <Link
                        href="/register"

                        className="
                            mt-2 inline-block
                            text-sm font-semibold
                            text-cyan-400
                            transition
                            hover:text-cyan-300
                        "
                    >
                        Criar conta
                    </Link>

                </div>

            </div>

        </div>
    );
}