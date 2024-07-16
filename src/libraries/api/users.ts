import type { UserType } from "@/interfaces";
import { getUserById } from "../db";

export function getUser(): UserType | null {
  return getUserById(2);
}