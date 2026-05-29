"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "../config/api";

export default function RegisterPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleRegister(
        event: React.FormEvent
    ) {

        event.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não conferem.");
            return;
        }

        try {

            await api.post("/register", {
                name,
                email,
                password,
            });

            alert("Conta criada com sucesso!");

            router.push("/login");

        } catch (error: any) {

            alert(
                error.response?.data?.error ||
                "Erro ao criar conta."
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">

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
                        Criar conta
                    </h1>

                    <p className="mt-2 text-sm text-blue-100/70">
                        Crie sua conta para acessar a plataforma
                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-blue-100">
                            Nome
                        </label>

                        <input
                            type="text"
                            placeholder="Digite seu nome"

                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
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

                    <div>

                        <label className="mb-2 block text-sm font-medium text-blue-100">
                            Confirmar senha
                        </label>

                        <input
                            type="password"
                            placeholder="Confirme sua senha"

                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
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
                        Criar conta
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-sm text-blue-100/60">
                        Já possui uma conta?
                    </p>

                    <Link
                        href="/login"

                        className="
                            mt-2 inline-block
                            text-sm font-semibold
                            text-cyan-400
                            transition
                            hover:text-cyan-300
                        "
                    >
                        Fazer login
                    </Link>

                </div>

            </div>

        </div>
    );
}