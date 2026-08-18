"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const donation = async (data) => {
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  const res = await fetch(`${SERVER_URL}/api/donation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};