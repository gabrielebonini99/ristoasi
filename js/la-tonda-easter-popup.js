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
        <p>È arrivato il momento di celebrare la Pasqua: scopri il nostro menu pasquale, ricco di piatti freschi, sapori primaverili e tutto il gusto della tradizione. Prenota il tuo tavolo e festeggia con noi una Pasqua speciale, tra cibo delizioso, atmosfera familiare e tanta gioia! <a href="uploads/la-tonda-menu-pasqua-2026.pdf" target="_blank">Clicca qui</a> per scaricare il menu in formato PDF.</p>
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
