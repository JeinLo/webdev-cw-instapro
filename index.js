// index.js
import { renderHeaderComponent } from "./components/header-component.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderUserPostsPageComponent } from "./components/user-posts-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getPosts,
  addPost,
  getUserPosts,
  likePost,
  dislikePost,
} from "./api.js";
import {
  POSTS_PAGE,
  ADD_POSTS_PAGE,
  USER_POSTS_PAGE,
  AUTH_PAGE,
} from "./routes.js";

let page = null;
let posts = [];
export let user = null;
let token = null;

export const getToken = () => token;

export const setToken = (newToken) => {
  token = newToken;
};

export const setUser = (newUser) => {
  user = newUser;
  if (user) {
    setToken(user.token);
    goToPage(POSTS_PAGE);
  } else {
    setToken(null);
  }
};

export const getUser = () => user;

export const logout = () => {
  setUser(null);
  goToPage(POSTS_PAGE);
};

export const goToPage = (newPage, data = {}) => {
  if (
    [POSTS_PAGE, ADD_POSTS_PAGE, USER_POSTS_PAGE, AUTH_PAGE].includes(newPage)
  ) {
    if (newPage === POSTS_PAGE) {
      page = "loading";
      renderApp();
      return getPosts({ token })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          showNotification("Ошибка загрузки постов");
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === ADD_POSTS_PAGE) {
      if (!user) {
        goToPage(AUTH_PAGE);
        return;
      }
      page = ADD_POSTS_PAGE;
      renderApp();
      return;
    }

    if (newPage === USER_POSTS_PAGE) {
      page = "loading";
      renderApp();
      return getUserPosts({ userId: data.userId, token })
        .then((newPosts) => {
          page = USER_POSTS_PAGE;
          posts = newPosts;
          renderApp(data);
        })
        .catch((error) => {
          console.error(error);
          showNotification("Ошибка загрузки постов пользователя");
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === AUTH_PAGE) {
      page = AUTH_PAGE;
      renderApp();
      return;
    }
  }
};

export const renderApp = (data = {}) => {
  const appEl = document.getElementById("app");

  if (page === "loading") {
    return renderLoadingPageComponent({ appEl });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser,
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
      posts,
      user,
      goToPage,
      likePost,
      dislikePost,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick: ({ description, imageUrl }) => {
        addPost({ description, imageUrl, token })
          .then(() => getPosts({ token }))
          .then((newPosts) => {
            posts = newPosts;
            goToPage(POSTS_PAGE);
            showNotification("Пост успешно добавлен!");
          })
          .catch((error) => {
            console.error(error);
            showNotification("Ошибка при добавлении поста");
          });
      },
    });
  }

  if (page === USER_POSTS_PAGE) {
    return renderUserPostsPageComponent({
      appEl,
      userId: data.userId,
      posts,
      user,
      goToPage,
      likePost,
      dislikePost,
    });
  }
};

export function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

goToPage(POSTS_PAGE);
