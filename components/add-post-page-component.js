import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  let description = "";

  const render = () => {
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container"></div>
            <label>
              Описание:
              <textarea id="description-input" class="textarea" placeholder="Введите описание поста"></textarea>
            </label>
            <div class="form-error"></div>
            <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    const descriptionInput = document.getElementById("description-input");
    descriptionInput.addEventListener("input", () => {
      description = descriptionInput.value;
    });

    document.getElementById("add-button").addEventListener("click", () => {
      if (!imageUrl) {
        showNotification("Выберите изображение");
        return;
      }
      if (!description.trim()) {
        showNotification("Введите описание");
        return;
      }
      onAddPostClick({ description, imageUrl });
    });
  };

  render();
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}
