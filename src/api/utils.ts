let baseURL = 'http://localhost:8080/api';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://strident-api.herokuapp.com/api';
}

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

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

export async function createResource<T>(resourceName: string, data: T): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('stridentToken'),
    },
    body: JSON.stringify(data),
  });
  const resources = await response.json();
  return resources;
}

export async function updateResource<T>(
  resourceName: string,
  resourceId: string,
  data: T,
): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'PUT',
    headers: {
      Authorization: localStorage.getItem('stridentToken'),
    },
    body: JSON.stringify(data),
  });
  const resources = await response.json();
  return resources;
}

export async function deleteResources(resourceName: string, resourceId: string): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: 'DELETE',
    headers: {
      Authorization: localStorage.getItem('stridentToken'),
    },
  });
  const resources = await response.json();
  return resources;
}
