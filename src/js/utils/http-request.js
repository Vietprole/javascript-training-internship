import { API_BASE_URL, HTTP_METHODS } from '../constants/api';

async function httpRequest(method, body, url) {
  const options = { method };
  if (body) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = body;
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

async function Get(url = API_BASE_URL) {
  const data = await httpRequest(HTTP_METHODS.GET, null, url);
  return data;
}

async function Post(body, url = API_BASE_URL) {
  const data = await httpRequest(HTTP_METHODS.POST, body, url);
  return data;
}

async function Put(body, url) {
  const data = await httpRequest(HTTP_METHODS.PUT, body, url);
  return data;
}

async function Delete(url) {
  const data = await httpRequest(HTTP_METHODS.DELETE, null, url);
  return data;
}

export { Get, Post, Put, Delete };
