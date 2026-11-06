"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell, PageHeader } from "@/app/components/AppShell";
import { pb } from "@/lib/pocketbase";

export default function CadastroAluno() {
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const dados = new FormData(form);
    setSalvando(true); setMensagem("");
    try {
      await pb.collection("tb_aluno").create({ nome: dados.get("nome"), idade: dados.get("idade"), email: dados.get("email"), telefone: dados.get("telefone") });
      form.reset(); setMensagem("Aluno cadastrado com sucesso.");
    } catch { setMensagem("Não foi possível cadastrar o aluno. Verifique os dados e tente novamente."); }
    finally { setSalvando(false); }
  }

  return <AppShell><div className="page-container">
    <PageHeader eyebrow="Alunos" title="Cadastrar aluno" description="Preencha os dados abaixo para adicionar um novo aluno ao sistema." />
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
      <form onSubmit={salvar} className="card p-5 sm:p-8">
        {mensagem && <div role="status" className={`mb-6 rounded-xl border px-4 py-3 text-sm ${mensagem.includes("sucesso") ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>{mensagem}</div>}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><label htmlFor="nome" className="field-label">Nome completo</label><input id="nome" name="nome" required autoComplete="name" placeholder="Ex.: Maria da Silva" className="field-input" /></div>
          <div><label htmlFor="idade" className="field-label">Idade</label><input id="idade" name="idade" required type="number" min="1" max="120" inputMode="numeric" placeholder="Ex.: 20" className="field-input" /></div>
          <div><label htmlFor="telefone" className="field-label">Telefone</label><input id="telefone" name="telefone" required type="tel" autoComplete="tel" placeholder="(00) 00000-0000" className="field-input" /></div>
          <div className="sm:col-span-2"><label htmlFor="email" className="field-label">E-mail</label><input id="email" name="email" required type="email" autoComplete="email" placeholder="aluno@exemplo.com" className="field-input" /></div>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end"><Link href="/alunos/consulta" className="btn-secondary">Cancelar</Link><button type="submit" disabled={salvando} className="btn-primary">{salvando ? "Salvando..." : "Cadastrar aluno"}</button></div>
      </form>
      <aside className="card h-fit p-6"><div className="grid size-10 place-items-center rounded-xl bg-indigo-50 font-bold text-indigo-700">i</div><h2 className="mt-4 font-bold">Antes de salvar</h2><p className="mt-2 text-sm leading-6 text-slate-600">Confira se o nome e os dados de contato estão corretos. Todos os campos são obrigatórios.</p></aside>
    </div>
  </div></AppShell>;
}
