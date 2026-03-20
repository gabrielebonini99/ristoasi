document.addEventListener('DOMContentLoaded', function() {
  // Configurazione dell'effetto neve
  const COUNT = 50;           // Numero totale di fiocchi
  const MIN_SIZE = 5;         // Dimensione minima (px)
  const MAX_SIZE = 15;        // Dimensione massima (px)
  const MIN_DURATION = 10;    // Velocità massima (secondi per cadere)
  const MAX_DURATION = 25;    // Velocità minima (secondi per cadere)

  // Funzione di utilità per generare numeri casuali
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Creazione e iniezione degli stili CSS necessari
  const style = document.createElement('style');
  style.textContent = `
    .snow-container-injected {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    .snowflake-injected {
      position: absolute;
      background: white;
      border-radius: 50%;
      /* Ripristinato l'ombreggiatura originale scura */
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
      animation: fall linear infinite;
    }
    @keyframes fall {
      0% { transform: translateY(-10vh); }
      100% { transform: translateY(110vh); }
    }
  `;
  document.head.appendChild(style);

  // Creazione del contenitore principale per i fiocchi
  const container = document.createElement('div');
  container.classList.add('snow-container-injected');
  document.body.appendChild(container);

  // Ciclo per generare e personalizzare ogni singolo fiocco
  for (let i = 0; i < COUNT; i++) {
    const snowflake = document.createElement('div');
    const size = random(MIN_SIZE, MAX_SIZE);
    
    snowflake.classList.add('snowflake-injected');
    
    // Posizionamento orizzontale casuale
    snowflake.style.left = random(0, 100) + 'vw';
    
    // Dimensioni e opacità casuali per profondità
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    snowflake.style.opacity = random(0.5, 1);
    
    // Durata dell'animazione casuale (velocità)
    snowflake.style.animationDuration = random(MIN_DURATION, MAX_DURATION) + 's';
    
    // Ritardo negativo per far apparire i fiocchi già in caduta all'avvio
    snowflake.style.animationDelay = '-' + random(0, MAX_DURATION) + 's';
    
    container.appendChild(snowflake);
  }
});
