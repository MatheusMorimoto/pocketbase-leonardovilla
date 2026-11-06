"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  async function entrar(evento: React.SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setEntrando(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível entrar.");
      }

      pb.authStore.save(data.token, data.record);
      router.push("/");
      router.refresh();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível entrar.");
      setEntrando(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <section className="hidden bg-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold">
          <span className="grid size-10 place-items-center rounded-xl bg-white text-sm text-indigo-700">GA</span>
          Gestão Acadêmica
        </Link>
        <div className="max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">Acesso ao sistema</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight">Gerencie seus alunos com simplicidade.</h1>
          <p className="mt-5 text-base leading-7 text-indigo-100">Todas as informações acadêmicas organizadas em um ambiente rápido e intuitivo.</p>
        </div>
        <p className="text-xs text-indigo-200">© 2026 Gestão Acadêmica</p>
      </section>

      <section className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 font-bold lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-sm text-white">GA</span>
            Gestão Acadêmica
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Bem-vindo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Entre na sua conta</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Use seu e-mail e senha para acessar o sistema.</p>

          <form action="/api/auth-form" method="post" onSubmit={entrar} className="mt-8">
            {erro && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{erro}</div>}
            <div>
              <label htmlFor="email" className="field-label">E-mail</label>
              <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="seuemail@exemplo.com" className="field-input" />
            </div>
            <div className="mt-5">
              <label htmlFor="senha" className="field-label">Senha</label>
              <input id="senha" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" placeholder="Digite sua senha" className="field-input" />
            </div>
            <button type="submit" disabled={entrando} className="btn-primary mt-7 min-h-12 w-full">{entrando ? "Entrando..." : "Entrar no sistema"}</button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">Problemas para entrar? Fale com o administrador do sistema.</p>
        </div>
      </section>
    </main>
  );
}
