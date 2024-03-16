import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors";
import { setToken } from "../utils/token";
import { commonFetch } from "../utils/fetch";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest) => {
    const res = await commonFetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      // if (res.status === 401) {
      //   setError("Credentials are not valid.");
      // } else {
      //   setError(UNKNOWN_ERROR_MESSAGE);
      // }
      // return;

      // more informative way but maybe it's not a good idea
      let errorMessage = UNKNOWN_ERROR_MESSAGE; // Assume a default error message
      try {
        const errorBody = await res.json(); // Attempt to parse JSON error response
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch (e) {
        // If parsing fails, retain the default or previously set error message
      }

      switch (res.status) {
        case 401:
          setError(errorMessage || "Credentials are not valid.");
          break;
        case 400:
          setError(errorMessage || "Bad request. Please check your input.");
          break;
        case 403:
          setError("Access denied.");
          break;
        case 404:
          setError("Requested resource not found.");
          break;
        case 500:
          setError("Server error. Please try again later.");
          break;
        default:
          setError(errorMessage);
          break;
      }
      return;
    }
    setToken(await res.text());
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
