/* === CONFIGURAZIONE === */
const NUM_SNOWFLAKES = 50; // Quanti fiocchi vuoi far cadere
const MIN_SIZE = 5;      // Dimensione minima in pixel
const MAX_SIZE = 15;     // Dimensione massima in pixel
const MIN_DURATION = 10; // Durata minima (velocità massima) in secondi
const MAX_DURATION = 25; // Durata massima (velocità minima) in secondi


/**
 * 1. INIEZIONE DELLO STILE CSS E DELLE ANIMAZIONI
 */
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Contenitore principale */
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

        /* Stile del singolo fiocco */
        .snowflake-injected {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
            animation: fall linear infinite;
        }

        /* Animazione di caduta */
        @keyframes fall {
            0% {
                transform: translateY(-10vh);
            }
            100% {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
}


/**
 * 2. GENERAZIONE E INIEZIONE DEL CONTENITORE HTML E DEI FIOCCHI
 */
function generateSnowflakes() {
    // Funzione helper per numeri casuali
    const random = (min, max) => Math.random() * (max - min) + min;

    // Crea e aggiungi il contenitore
    const snowContainer = document.createElement('div');
    snowContainer.classList.add('snow-container-injected');
    document.body.appendChild(snowContainer);

    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake-injected');

        // Imposta posizione (larghezza)
        const xPos = random(0, 100);
        snowflake.style.left = `${xPos}vw`;

        // Imposta dimensione
        const size = random(MIN_SIZE, MAX_SIZE);
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // Imposta velocità (duration)
        const fallDuration = random(MIN_DURATION, MAX_DURATION);
        snowflake.style.animationDuration = `${fallDuration}s`;

        // Imposta ritardo (delay negativo per partire subito)
        const fallDelay = random(0, MAX_DURATION);
        snowflake.style.animationDelay = `-${fallDelay}s`;

        // Imposta opacità
        const opacity = random(0.5, 1);
        snowflake.style.opacity = opacity;

        snowContainer.appendChild(snowflake);
    }
}

// Esegui le funzioni quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    generateSnowflakes();
});
