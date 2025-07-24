import { API_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/cookies";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAuthToken();

  try {
    await axios.post(
      API_URL + "/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
  }

  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}

