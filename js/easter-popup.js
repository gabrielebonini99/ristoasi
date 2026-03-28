(function() {
  const styleElement = document.createElement("style");
  
  styleElement.innerText = `
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, .3);
      display: grid;
      place-content: center;
      opacity: 0;
      pointer-events: none;
      transition: 200ms ease-in-out opacity;
      z-index: 9999;
    }
    .popup-content {
      width: clamp(300px, 90vw, 500px);
      background-color: #fff;
      padding: clamp(1.5rem, 100vw, 3rem);
      box-shadow: 0 0 .5em rgba(0, 0, 0, .5);
      border-radius: .5em;
      opacity: 0;
      transform: translateY(20%);
      transition: 200ms ease-in-out opacity, 200ms ease-in-out transform;
      position: relative;
    }
    .popup h4 {
      font-size: 25px;
      margin-bottom: 20px;
    }
    .popup p {
      margin-bottom: 0;
    }
    .popup span {
      position: absolute;
      top: 2rem;
      right: 2rem;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      font-size: 25px;
    }
    .popup span:active {
      transform: scale(.9);
    }
    .showPopup {
      opacity: 1 !important;
      transform: translateY(0) !important;
      pointer-events: all !important;
    }
  `;

  document.head.appendChild(styleElement);

  const popupHtml = `
    <div class="popup">
      <div class="popup-content">
        <span>X</span>
        <h4>Menu di Pasqua 2026</h4>
        <p>La Pasqua si avvicina. Lasciati ispirare dalle nostre proposte esclusive, un viaggio tra sapori primaverili, materie prime d'eccellenza e l'accoglienza che ci contraddistingue. Ti invitiamo a scoprire i menù dedicati visitando le pagine dei nostri ristoranti, dove troverai dettagli su piatti unici e atmosfere pensate per rendere la tua festa indimenticabile.</p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHtml);

  const popupOverlay = document.querySelector(".popup");
  const popupContainer = document.querySelector(".popup-content");
  const closeBtn = document.querySelector(".popup-content span");

  window.addEventListener("load", () => {
    popupOverlay.classList.add("showPopup");
    popupContainer.classList.add("showPopup");
  });

  closeBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("showPopup");
    popupContainer.classList.remove("showPopup");
  });
})();
