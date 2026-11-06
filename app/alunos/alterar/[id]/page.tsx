"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell, PageHeader } from "@/app/components/AppShell";
import { pb } from "@/lib/pocketbase";

type Aluno = { id: string; nome: string; idade: string; email: string; telefone: string };

export default function AlterarAluno() {
  const { id } = useParams<{ id: string }>(); const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null); const [carregando, setCarregando] = useState(true); const [salvando, setSalvando] = useState(false); const [erro, setErro] = useState("");
  useEffect(() => { pb.collection("tb_aluno").getOne<Aluno>(id, { requestKey: null }).then(setAluno).catch(() => setErro("Não foi possível carregar este aluno.")).finally(() => setCarregando(false)); }, [id]);
  async function salvar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); const dados = new FormData(e.currentTarget); setSalvando(true); setErro("");
    try { await pb.collection("tb_aluno").update(id, { nome: dados.get("nome"), idade: dados.get("idade"), email: dados.get("email"), telefone: dados.get("telefone") }); router.push("/alunos/consulta"); }
    catch { setErro("Não foi possível salvar as alterações."); setSalvando(false); }
  }
  return <AppShell><div className="page-container">
    <PageHeader eyebrow="Alunos" title="Alterar aluno" description="Atualize os dados do aluno e salve as alterações." />
    <div className="mx-auto mt-8 max-w-3xl">
      {carregando && <div className="card p-8 text-center text-sm text-slate-500">Carregando dados do aluno...</div>}
      {erro && !aluno && <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{erro}</div>}
      {aluno && <form onSubmit={salvar} className="card p-5 sm:p-8">
        {erro && <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{erro}</div>}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><label htmlFor="nome" className="field-label">Nome completo</label><input id="nome" name="nome" required defaultValue={aluno.nome} className="field-input" /></div>
          <div><label htmlFor="idade" className="field-label">Idade</label><input id="idade" name="idade" required type="number" min="1" max="120" defaultValue={aluno.idade} className="field-input" /></div>
          <div><label htmlFor="telefone" className="field-label">Telefone</label><input id="telefone" name="telefone" required type="tel" defaultValue={aluno.telefone} className="field-input" /></div>
          <div className="sm:col-span-2"><label htmlFor="email" className="field-label">E-mail</label><input id="email" name="email" required type="email" defaultValue={aluno.email} className="field-input" /></div>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end"><button type="button" onClick={() => router.push("/alunos/consulta")} className="btn-secondary">Cancelar</button><button type="submit" disabled={salvando} className="btn-primary">{salvando ? "Salvando..." : "Salvar alterações"}</button></div>
      </form>}
    </div>
  </div></AppShell>;
}
