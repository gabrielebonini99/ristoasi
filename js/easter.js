(function() {
    const isDesktop = window.innerWidth > 1024 && window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const existingContainer = document.getElementById('bunny-game-meta');
    if (existingContainer) existingContainer.remove();

    const style = document.createElement('style');
    style.id = 'bunny-game-meta';
    style.innerHTML = `
        #bunny-counter {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: white; 
            mix-blend-mode: difference; 
            padding: 10px 22px;
            border-radius: 30px;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: black;
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            user-select: none;
            min-width: 40px;
            white-space: nowrap;
        }

        #bunny-instructions {
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 0.5px;
            opacity: 1;
            transition: opacity 0.4s ease;
            border-left: 1px solid rgba(0,0,0,0.2);
            padding-left: 15px;
        }

        .instructions-hidden { display: none !important; }
        .counter-pop { transform: scale(1.2); }
        
        .game-over {
            font-size: 16px !important;
            letter-spacing: 1px;
            padding: 12px 25px !important;
        }

        .easter-target {
            position: fixed;
            cursor: pointer;
            user-select: none;
            opacity: 0;
            transition: opacity 1.5s ease, transform 0.6s ease;
            filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
            line-height: 1;
        }

        .target-visible { opacity: 1 !important; }

        .target-clicked {
            opacity: 0 !important;
            transform: scale(2.5) rotate(20deg) !important;
            pointer-events: none;
            transition: opacity 1s ease, transform 0.6s ease !important;
        }
    `;
    document.head.appendChild(style);

    let count = 0;
    let isSpawnActive = false;
    let gameEnded = false;
    const TARGET_SCORE = 10;

    const counter = document.createElement('div');
    counter.id = 'bunny-counter';
    counter.innerHTML = `
        <span id="bunny-num">0</span>
        <span id="bunny-instructions">Trova 10 coniglietti per vincere</span>
    `;
    document.body.appendChild(counter);

    function updateCounter() {
        count++;
        const numSpan = document.getElementById('bunny-num');
        const instSpan = document.getElementById('bunny-instructions');
        
        if (count === 1 && instSpan) instSpan.classList.add('instructions-hidden');
        
        if (count >= TARGET_SCORE) {
            gameEnded = true;
            counter.classList.add('game-over');
            counter.innerHTML = "Hai vinto!";
        } else {
            numSpan.innerText = count;
            counter.classList.add('counter-pop');
            setTimeout(() => counter.classList.remove('counter-pop'), 300);
        }
    }

    function spawnManager() {
        if (gameEnded || isSpawnActive) return; 
        isSpawnActive = true;

        const icon = document.createElement('div');
        icon.className = 'easter-target';
        icon.innerText = '🐰';
        icon.style.fontSize = (Math.floor(Math.random() * 26) + 50) + 'px';
        icon.style.left = (Math.random() * 70 + 15) + 'vw';
        icon.style.top = (Math.random() * 60 + 20) + 'vh';

        document.body.appendChild(icon);
        setTimeout(() => icon.classList.add('target-visible'), 100);

        let processed = false;
        
        const finish = (delay) => {
            if (processed) return;
            processed = true;
            icon.classList.remove('target-visible');
            setTimeout(() => {
                icon.remove();
                isSpawnActive = false;
                if (!gameEnded) setTimeout(spawnManager, 800);
            }, delay);
        };

        icon.addEventListener('mousedown', (e) => {
            e.preventDefault();
            updateCounter();
            icon.classList.add('target-clicked');
            finish(1000);
        });

        setTimeout(() => finish(1500), 4000);
    }

    spawnManager();
})();
