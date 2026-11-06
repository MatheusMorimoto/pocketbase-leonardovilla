"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState(pb.authStore.record);

  useEffect(() => pb.authStore.onChange((_, record) => setUsuario(record), true), []);

  function sair() {
    pb.authStore.clear();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-200">GA</span>
            <span><span className="block text-sm font-bold leading-none">Gestão Acadêmica</span><span className="mt-1 block text-xs text-slate-500">Controle de alunos</span></span>
          </Link>
          <nav className="flex items-center gap-1" aria-label="Navegação principal">
            <Link href="/" className="nav-link hidden sm:inline-flex">Início</Link>
            <Link href="/alunos/consulta" className="nav-link">Alunos</Link>
            {usuario ? (
              <div className="ml-1 flex items-center gap-2">
                <span className="hidden max-w-40 truncate text-xs font-semibold text-slate-600 lg:block">{usuario.name || usuario.email}</span>
                <button type="button" onClick={sair} className="btn-secondary min-h-10 px-3">Sair</button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary ml-1">Entrar</Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Gestão Acadêmica</p><p>Sistema de gerenciamento de alunos</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}
