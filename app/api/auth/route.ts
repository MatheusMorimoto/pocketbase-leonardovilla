import { NextResponse } from "next/server";

const POCKETBASE_URL =
  process.env.POCKETBASE_URL ?? "http://127.0.0.1:8090";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json(
        { message: "Informe o e-mail e a senha." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${POCKETBASE_URL}/api/collections/users/auth-with-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity: email.trim(), password: senha }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "E-mail ou senha incorretos." },
        { status: response.status },
      );
    }

    return NextResponse.json({ token: data.token, record: data.record });
  } catch {
    return NextResponse.json(
      { message: "Não foi possível conectar ao servidor de autenticação." },
      { status: 503 },
    );
  }
}
