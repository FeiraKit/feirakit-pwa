import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // Chama sua API de autenticação
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha: password }),
    });

    const data = await res.json();

    if (!res.ok || !data.resultado) {
      return NextResponse.json(
        { result: false, message: data.mensagem ?? "Erro de login" },
        { status: 401 }
      );
    }

    const token = data.token;

    const response = NextResponse.json({
      result: data.resultado,
      message: data.mensagem,
      user: data.usuario,
    });

    // seta o cookie HttpOnly
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // só HTTPS em produção
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 5, // 5 anos
    });

    return response;
  } catch (error) {
    console.error("Erro interno no login:", error);
    return NextResponse.json(
      {
        result: false,
        message:
          "Não foi possível conectar ao servidor. Verifique sua internet.",
      },
      { status: 500 }
    );
  }
}
