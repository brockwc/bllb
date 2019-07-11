import tokenService from "./tokenService";

const BASE_URL = '/api/posts';

export async function getAllPosts() {
  return fetch(BASE_URL).then(res => res.json());
}

export function createPost(data) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
    },
    body: JSON.stringify(data)
  };

  return fetch(BASE_URL, options).then(res => res.json());
}