const postsHost =
  "https://webdev-hw-api.vercel.app/api/v2/alenayudina/instapro";

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: token ? { Authorization: token } : {},
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => data.posts);
}

export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: token ? { Authorization: token } : {},
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => data.posts);
}

export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, imageUrl }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Ошибка добавления поста");
    }
    return response.json();
  });
}

export function likePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/like`, {
    method: "POST",
    headers: { Authorization: token },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }
    return response.json();
  });
}

export function dislikePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/dislike`, {
    method: "POST",
    headers: { Authorization: token },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({ login, password, name, imageUrl }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь уже существует");
    }
    return response.json();
  });
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch("https://webdev-hw-api.vercel.app/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => response.json());
}
