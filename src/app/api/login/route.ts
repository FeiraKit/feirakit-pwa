import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const response = NextResponse.json({
      result: true,
      message: "Login bem-sucedido",
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
