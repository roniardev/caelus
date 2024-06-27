import { Scrypt } from 'lucia';
import { cookies } from 'next/headers';

import { lucia } from '@/lib/auth';

import { db } from '@/server/db';

import { LoginInput, loginSchema } from './auth.input';

type LoginResponse = {
  status: number;
  data: {
    token: string;
    expiresAt: Date;
  };
};

export const login = async (input: LoginInput): Promise<LoginResponse> => {
  const { email, password } = loginSchema.parse(input);

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq: eqFn }) => eqFn(table.email, email),
  });

  if (!existingUser || !existingUser?.hashedPassword) {
    throw new Error('Incorrect email or password');
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    throw new Error('Incorrect email or password');
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return {
    status: 200,
    data: {
      token: session.id,
      expiresAt: session.expiresAt,
    },
  };
};
