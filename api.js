const postsHost = "https://webdev-hw-api.vercel.app/api/v2/JeinLo/instapro";

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    body: JSON.stringify({
      description,
      imageUrl,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(postsHost + "/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(postsHost + "/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function likePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function dislikePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/dislike`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(postsHost + "/upload-image", {
    method: "POST",
    body: data,
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error ${response.status}: ${text}`);
      });
    }
    return response.json();
  });
}
