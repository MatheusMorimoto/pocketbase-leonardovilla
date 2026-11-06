"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell, PageHeader } from "@/app/components/AppShell";
import { pb } from "@/lib/pocketbase";

type Aluno = { id: string; nome: string; idade: string; email: string; telefone: string };

export default function ConsultarAluno() {
  const [alunos, setAlunos] = useState<Aluno[]>([]); const [busca, setBusca] = useState(""); const [excluir, setExcluir] = useState<Aluno | null>(null); const [carregando, setCarregando] = useState(true); const [erro, setErro] = useState(""); const [excluindo, setExcluindo] = useState(false);
  useEffect(() => { pb.collection("tb_aluno").getFullList<Aluno>({ sort: "nome", requestKey: null }).then(setAlunos).catch(() => setErro("Não foi possível carregar os alunos. Verifique se o PocketBase está em execução.")).finally(() => setCarregando(false)); }, []);
  const filtrados = alunos.filter((a) => a.nome?.toLowerCase().includes(busca.trim().toLowerCase()));
  async function confirmarExclusao() {
    if (!excluir) return; setExcluindo(true);
    try { await pb.collection("tb_aluno").delete(excluir.id); setAlunos((lista) => lista.filter((a) => a.id !== excluir.id)); setExcluir(null); }
    catch { setErro("Não foi possível excluir o aluno."); setExcluir(null); }
    finally { setExcluindo(false); }
  }
  const Actions = ({ aluno }: { aluno: Aluno }) => <div className="flex flex-wrap gap-2"><Link href={`/alunos/alterar/${aluno.id}`} className="btn-secondary min-h-9 px-3 py-1.5">Alterar</Link><button onClick={() => setExcluir(aluno)} className="btn-danger">Excluir</button></div>;

  return <AppShell><div className="page-container">
    <PageHeader eyebrow="Alunos" title="Lista de alunos" description="Consulte, pesquise e gerencie todos os alunos cadastrados." action={<Link href="/alunos/cadastro" className="btn-primary">+ Cadastrar aluno</Link>} />
    <div className="card mt-8 overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative w-full sm:max-w-md"><span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">&#9906;</span><label htmlFor="busca" className="sr-only">Buscar aluno</label><input id="busca" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar aluno por nome..." className="field-input pl-10" /></div>
        <p className="text-sm text-slate-500"><strong className="text-slate-800">{filtrados.length}</strong> {filtrados.length === 1 ? "aluno encontrado" : "alunos encontrados"}</p>
      </div>
      {erro && <div className="m-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{erro}</div>}
      {carregando ? <div className="p-12 text-center text-sm text-slate-500">Carregando alunos...</div> : filtrados.length === 0 ? <div className="p-12 text-center"><div className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-xl text-slate-400">&#9906;</div><h2 className="mt-4 font-bold">Nenhum aluno encontrado</h2><p className="mt-1 text-sm text-slate-500">Tente outro nome ou cadastre um novo aluno.</p></div> : <>
        <div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3.5 font-semibold">Aluno</th><th className="px-5 py-3.5 font-semibold">Idade</th><th className="px-5 py-3.5 font-semibold">E-mail</th><th className="px-5 py-3.5 font-semibold">Telefone</th><th className="px-5 py-3.5 font-semibold">Ações</th></tr></thead><tbody className="divide-y divide-slate-100">{filtrados.map((a) => <tr key={a.id} className="hover:bg-slate-50/80"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-50 font-bold text-indigo-700">{a.nome?.charAt(0).toUpperCase()}</span><span className="font-semibold text-slate-900">{a.nome}</span></div></td><td className="px-5 py-4 text-slate-600">{a.idade}</td><td className="px-5 py-4 text-slate-600">{a.email}</td><td className="px-5 py-4 text-slate-600">{a.telefone}</td><td className="px-5 py-4"><Actions aluno={a} /></td></tr>)}</tbody></table></div>
        <div className="divide-y divide-slate-200 md:hidden">{filtrados.map((a) => <article key={a.id} className="p-5"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 font-bold text-indigo-700">{a.nome?.charAt(0).toUpperCase()}</span><div className="min-w-0"><h2 className="font-bold text-slate-900">{a.nome}</h2><p className="mt-1 truncate text-sm text-slate-500">{a.email}</p></div></div><dl className="my-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-sm"><div><dt className="text-xs text-slate-500">Idade</dt><dd className="mt-1 font-semibold">{a.idade}</dd></div><div><dt className="text-xs text-slate-500">Telefone</dt><dd className="mt-1 font-semibold">{a.telefone}</dd></div></dl><Actions aluno={a} /></article>)}</div>
      </>}
    </div>
  </div>
  {excluir && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="titulo-exclusao"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="grid size-11 place-items-center rounded-full bg-rose-50 text-xl text-rose-600">!</div><h2 id="titulo-exclusao" className="mt-4 text-xl font-bold">Excluir aluno?</h2><p className="mt-2 text-sm leading-6 text-slate-600">O cadastro de <strong className="text-slate-900">{excluir.nome}</strong> será removido permanentemente. Essa ação não pode ser desfeita.</p><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button onClick={() => setExcluir(null)} className="btn-secondary">Cancelar</button><button onClick={confirmarExclusao} disabled={excluindo} className="btn-danger min-h-10 px-4">{excluindo ? "Excluindo..." : "Sim, excluir"}</button></div></div></div>}
  </AppShell>;
}
