import { Credentials, LoginResponse } from './types';

let baseURL = 'https://strident-api.herokuapp.com/api';
// let baseURL = 'http://localhost:8080/api';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://strident-api.herokuapp.com/api';
}

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function login(creds: Credentials): Promise<LoginResponse> {
  const response = await fetch(`${baseURL}/auth/login`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(creds),
  });

  if (response.status >= 400) {
    switch (response.status) {
      case 404:
        return { token: '', err: 'User not found' };
      case 401:
        return { token: '', err: 'Wrong credentials' };
      case 500:
        return { token: '', err: 'Something went wrong' };
      default:
        return { token: '', err: 'Something went wrong' };
    }
  }

  const token = await response.json();
  return { token, err: '' };
}

export async function fetchResources<T>(resourceName: string): Promise<T[]> {
  const response = await fetch(`${baseURL}/${resourceName}`, options);
  const resources = await response.json();
  return resources;
}

export async function fetchResource<T>(resourceName: string, resourceId: string): Promise<T> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, options);
  const resources = await response.json();
  return resources;
}

export async function createResource<T>(resourceName: string, data: T): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('stridentToken')}`,
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 200:
      return 'Created Successfully';
    case 401:
      return 'Not Authorized';
    case 422:
      return 'Fill Out All The fields';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}

export async function updateResource<T>(
  resourceName: string,
  resourceId: string,
  data: T,
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('stridentToken')}`,
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 200:
      return 'Updated Successfully';
    case 401:
      return 'Not Authorized';
    case 422:
      return 'Fill Out All The Fields';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}

export async function deleteResource(resourceName: string, resourceId: string): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('stridentToken')}`,
    },
  });

  switch (response.status) {
    case 200:
      return 'Deleted Successfully';
    case 401:
      return 'Not Authorized';
    case 422:
      return 'Fill Out All The Fields';
    case 500:
      return 'Something Went Wrong';
    default:
      return '';
  }
}
