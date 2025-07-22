import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "@/lib/api";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await axios.post(API_URL + "/login", body);
    const { token, user } = res.data;

    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

    // Simpan token di cookie HttpOnly
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}

