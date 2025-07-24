import { API_URL } from "@/lib/api"
import { getAuthToken } from "@/lib/cookies"
import axios from "axios"

export const getCurrentUser = async () => {
  const token = await getAuthToken();

  try {
    const data = await axios.get(API_URL + "/user", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllUser = async () => {
  const token = await getAuthToken();

  try {
    const data = await axios.get(API_URL + "/users", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getUserById = async (id: string) => {
  const token = await getAuthToken();

  try {
    const data = await axios.get(API_URL + "/users/" + id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return data;
  } catch (error) {
    console.log(error);
  }
}
