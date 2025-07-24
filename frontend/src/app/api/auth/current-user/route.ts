import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/cookies";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAuthToken();

  try {
    const res = await axios.get(API_URL + "/user", {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Unauthorize" },
      { status: error?.response?.status || 500 }
    );
  }
}

