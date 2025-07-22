import { API_URL } from "@/lib/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await axios.post(API_URL + "/reset-password", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { errors: error?.response?.data?.errors || "failed to reset password" },
      { status: error?.response?.status || 500 }
    );
  }
}

