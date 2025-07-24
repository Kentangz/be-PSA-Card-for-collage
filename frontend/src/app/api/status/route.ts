import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/cookies";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = await getAuthToken();

  try {
    const res = await axios.post(API_URL + "/status", body, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.response?.data?.message || "failed to update status" },
      { status: error?.response?.status || 500 }
    );
  }
}

