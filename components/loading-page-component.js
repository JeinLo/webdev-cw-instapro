import { renderHeaderComponent } from "./header-component.js";

/**
 * Компонент страницы загрузки.
 * Отображает страницу с индикатором загрузки и заголовком.
 * Используется для промежуточного состояния во время загрузки данных.
 *
 * @param {Object} params
 * @param {HTMLElement} params.appEl - Корневой элемент приложения, в который рендерится страница.
 */
export function renderLoadingPageComponent({ appEl }) {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="loading-page">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}
