import { loginUser, registerUser } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAuthPageComponent({ appEl, setUser }) {
  let isLoginMode = true;
  let imageUrl = "";

  const renderForm = () => {
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                ${isLoginMode ? "Вход в Instapro" : "Регистрация в Instapro"}
              </h3>
              <div class="form-inputs">
                  ${
                    !isLoginMode
                      ? `
                      <div class="upload-image-container"></div>
                      <input type="text" id="name-input" class="input" placeholder="Имя" />
                      `
                      : ""
                  }
                  <input type="text" id="login-input" class="input" placeholder="Логин" />
                  <input type="password" id="password-input" class="input" placeholder="Пароль" />
                  <div class="form-error"></div>
                  <button class="button" id="login-button">${
                    isLoginMode ? "Войти" : "Зарегистрироваться"
                  }</button>
              </div>
              <div class="form-footer">
                <p class="form-footer-title">
                  ${isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  <button class="link-button" id="toggle-button">
                    ${isLoginMode ? "Зарегистрироваться." : "Войти."}
                  </button>
                </p>
              </div>
          </div>
      </div>    
    `;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("login-button").addEventListener("click", () => {
      setError("");
      const loginInput = document.getElementById("login-input");
      const passwordInput = document.getElementById("password-input");
      const nameInput = document.getElementById("name-input");

      if (isLoginMode) {
        loginInput.classList.remove("-error");
        passwordInput.classList.remove("-error");
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (!login) {
          loginInput.classList.add("-error");
          setError("Введите логин");
          return;
        }

        if (!password) {
          passwordInput.classList.add("-error");
          setError("Введите пароль");
          return;
        }

        loginUser({ login, password })
          .then((response) => {
            setUser(response.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      } else {
        loginInput.classList.remove("-error");
        passwordInput.classList.remove("-error");
        nameInput?.classList.remove("-error");
        const login = loginInput.value.trim();
        const name = nameInput?.value.trim();
        const password = passwordInput.value.trim();

        if (!name) {
          nameInput.classList.add("-error");
          setError("Введите имя");
          return;
        }

        if (!login) {
          loginInput.classList.add("-error");
          setError("Введите логин");
          return;
        }

        if (!password) {
          passwordInput.classList.add("-error");
          setError("Введите пароль");
          return;
        }

        if (!imageUrl) {
          setError("Не выбрана фотография");
          return;
        }

        registerUser({ login, password, name, imageUrl })
          .then((response) => {
            setUser(response.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      }
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}
