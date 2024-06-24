import { OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';

import { google, lucia } from '@/lib/auth';
import { Paths } from '@/lib/constant';

import { db } from '@/server/db';
import { users } from '@/server/db/schema';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  const storedCodeVerifier =
    cookies().get('google_oauth_code_verifier')?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
      headers: { Location: Paths.Login },
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUserRes = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const googleUser = (await googleUserRes.json()) as GoogleUser;

    if (!googleUser.email) {
      return new Response(
        JSON.stringify({
          error: 'Your Discord account must have a verified email address.',
        }),
        { status: 400, headers: { Location: Paths.Login } },
      );
    }
    const existingUser = await db.query.users.findFirst({
      where: (table, { or }) =>
        or(
          eq(table.googleId, googleUser.sub),
          eq(table.email, googleUser.email),
        ),
    });

    // const avatar = discordUser.avatar
    //   ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`
    //   : null;

    if (!existingUser) {
      const userId = generateId(21);
      await db.insert(users).values({
        id: userId,
        email: googleUser.email,
        googleId: googleUser.sub,
        emailVerified: true,
      });
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: { Location: Paths.Dashboard },
      });
    }

    if (existingUser.googleId !== googleUser.sub) {
      await db
        .update(users)
        .set({
          googleId: googleUser.sub,
          emailVerified: true,
        })
        .where(eq(users.id, existingUser.id));
    }
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: { Location: Paths.Dashboard },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: 'Invalid code' }), {
        status: 400,
      });
    }
    // eslint-disable-next-line no-console
    console.log('err', e);
    return new Response(JSON.stringify({ message: 'internal server error' }), {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
