'use server';

import { env } from '@/config';
import { handleError, validateResponse } from '@/lib/utils';

export async function login(credentials) {
  try {
    const { email, password } = credentials || {};

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { response: data } = await validateResponse(
      res,
      'Error authenticating user',
    );

    return {
      email: data.email,
      name: data.user_name,
      id: data._id,
      accessToken: data.token,
      ...credentials,
    };
  } catch (error) {
    handleError(error, 'Could not login');
  }
}

export async function getUser(token) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const { response: data } = await validateResponse(
      res,
      'Error fetching user data',
    );

    return data;
  } catch (error) {
    handleError(error, 'Could not fetch user data');
  }
}

export async function updateUser(token, formData) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const { response: data } = await validateResponse(
      res,
      'Error updating user data',
    );

    return data;
  } catch (error) {
    handleError(error, 'Could not update user data');
  }
}
