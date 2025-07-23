import { API_URL } from "@/lib/api"
import { getAuthToken } from "@/lib/cookies"
import axios from "axios"

export const getCurrentUserCard = async () => {
  const token = await getAuthToken();

  try {
    const data = await axios.get(API_URL + "/user-cards", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}


export const getCurrentUserCardDetail = async (id: string) => {
  const token = await getAuthToken();

  try {
    const data = await axios.get(API_URL + "/user-cards/" + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}
