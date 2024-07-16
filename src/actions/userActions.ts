'use server';

export async function setUser(userId: number): Promise<void> {
  console.log('User ID:', userId);
  return Promise.resolve();
}
