import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/cookies";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.formData();
  const token = await getAuthToken();

  console.log(body);

  try {
    const res = await axios.post(API_URL + "/card", body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "failed to submit card" },
      { status: error?.response?.status || 500 }
    );
  }
}

