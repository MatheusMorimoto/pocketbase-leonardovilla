import { NextResponse } from "next/server";

const POCKETBASE_URL =
  process.env.POCKETBASE_URL ?? "http://127.0.0.1:8090";

function html(content: string, status = 200) {
  return new NextResponse(content, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const senha = String(form.get("senha") ?? "");

  try {
    const response = await fetch(
      `${POCKETBASE_URL}/api/collections/users/auth-with-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity: email, password: senha }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return html(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Login inválido</title><body style="font-family:Arial;background:#f8fafc;padding:40px"><main style="max-width:480px;margin:auto;background:white;padding:32px;border:1px solid #fecdd3;border-radius:16px"><h1 style="font-size:24px">Não foi possível entrar</h1><p style="color:#9f1239">E-mail ou senha incorretos.</p><a href="/login" style="color:#4f46e5;font-weight:bold">Voltar para o login</a></main></body></html>`, 401);
    }

    const authData = JSON.stringify({ token: data.token, record: data.record })
      .replaceAll("<", "\\u003c")
      .replaceAll(">", "\\u003e");

    return html(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Entrando...</title><body><p>Entrando no sistema...</p><script>localStorage.setItem("pocketbase_auth", ${JSON.stringify(authData)});window.location.replace("/");</script></body></html>`);
  } catch {
    return html(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Erro de conexão</title><body style="font-family:Arial;background:#f8fafc;padding:40px"><main style="max-width:480px;margin:auto;background:white;padding:32px;border:1px solid #fecdd3;border-radius:16px"><h1 style="font-size:24px">Servidor indisponível</h1><p style="color:#9f1239">Não foi possível conectar ao PocketBase.</p><a href="/login" style="color:#4f46e5;font-weight:bold">Tentar novamente</a></main></body></html>`, 503);
  }
}
