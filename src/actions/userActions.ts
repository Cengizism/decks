'use server';

import { emptySessions, saveSession } from '@/libraries/db/dbApi';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function setUser(userId: number) {
  saveSession(userId);
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  emptySessions();
  revalidatePath('/', 'layout');
  redirect('/login');
}
