import { getServerSession } from "next-auth";
import { AuthOptions } from "../app/api/auth/[...nextauth]/options";

export function getSession() {
  return getServerSession(AuthOptions);
}

export async function getCurrentUser(){
    const session = await getSession()
    return session?.user
}