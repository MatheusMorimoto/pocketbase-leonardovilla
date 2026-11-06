import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";

const features = [
  { number: "01", title: "Cadastro simples", text: "Registre os dados essenciais de cada aluno em poucos passos." },
  { number: "02", title: "Consulta rápida", text: "Encontre alunos pelo nome e visualize as informações organizadas." },
  { number: "03", title: "Gestão centralizada", text: "Atualize ou remova registros mantendo a base sempre organizada." },
];

export default function Home() {
  return (
    <AppShell>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,_#e0e7ff,_transparent_55%)]" />
        <div className="page-container relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">Gestão descomplicada</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Seus alunos, organizados em um só lugar.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Cadastre, consulte e mantenha as informações dos alunos com uma experiência simples, rápida e segura.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/alunos/cadastro" className="btn-primary min-h-12 px-6">Cadastrar aluno <span aria-hidden="true" className="ml-2">→</span></Link>
              <Link href="/alunos/consulta" className="btn-secondary min-h-12 px-6">Ver todos os alunos</Link>
            </div>
          </div>
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute right-0 top-0 size-32 rounded-bl-full bg-indigo-50" />
            <div className="relative">
              <div className="grid size-12 place-items-center rounded-2xl bg-indigo-600 text-xl text-white">&#10003;</div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Visão geral</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Tudo pronto para começar</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Acesse o cadastro para adicionar um novo aluno ou consulte os registros existentes.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-bold">4</p><p className="mt-1 text-xs text-slate-500">Dados por aluno</p></div>
                <div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-bold">100%</p><p className="mt-1 text-xs text-slate-500">Responsivo</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-container">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => <article key={feature.number} className="card p-6"><span className="text-sm font-bold text-indigo-600">{feature.number}</span><h2 className="mt-4 text-lg font-bold">{feature.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p></article>)}
        </div>
      </section>
    </AppShell>
  );
}
