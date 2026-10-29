class CapriBehaviorController {
  constructor(viewportElement) {
    this.viewport = viewportElement;
    this.dialogueEl = document.getElementById('capri-dialogue');
    this.currentState = 'arrive';
    this.modelData = null;
    this.initCanvas();
    this.init();
  }

  initCanvas() {
    const canvas = document.getElementById('capri-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr || 300;
    canvas.height = canvas.offsetHeight * dpr || 400;
    ctx.scale(dpr, dpr);

    this.renderAvatar(ctx, canvas.width / dpr, canvas.height / dpr);
  }

  renderAvatar(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    
    // Avatar Visual do Capri
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 - 20, 65, 0, Math.PI * 2);
    ctx.fill();

    // Detalhe de Iluminação
    ctx.fillStyle = '#818cf8';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 - 20, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAPRI ASSISTANT', width / 2, height / 2 + 70);
  }

  async init() {
    this.setupTouchListeners();
    this.setupKeyboardListeners();
    
    try {
      const response = await fetch('./assets/capri/model.json');
      if (response.ok) {
        this.modelData = await response.json();
      }
    } catch (e) {
      console.log("Executando modo mobile integrado.");
    }

    setTimeout(() => {
      this.triggerBehavior('arrive');
    }, 300);
  }

  triggerBehavior(stateName) {
    this.viewport.classList.remove(`state-${this.currentState}`);
    this.currentState = stateName;
    this.viewport.classList.add(`state-${stateName}`);

    switch (stateName) {
      case 'arrive':
        this.setDialogue("Capri conectada! Módulo mobile fundido e pronto para uso.");
        break;
      case 'crouch':
        this.setDialogue("Modo compacto acionado (ajuste para teclado).");
        break;
      case 'teleport':
        this.setDialogue("Realizando transição de teletransporte...");
        setTimeout(() => {
          this.triggerBehavior('arrive');
        }, 1200);
        break;
      case 'interact':
        this.setDialogue("Toque detectado! Como posso ajudar você?");
        break;
      default:
        break;
    }
  }

  setDialogue(text) {
    if (this.dialogueEl) {
      this.dialogueEl.textContent = text;
    }
  }

  setupTouchListeners() {
    let startY = 0;

    this.viewport.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    this.viewport.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          this.triggerBehavior('interact');
        } else {
          this.triggerBehavior('crouch');
        }
      }
    });
  }

  setupKeyboardListeners() {
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
        if (isKeyboardOpen) {
          this.triggerBehavior('crouch');
        } else {
          this.triggerBehavior('arrive');
        }
      });
    }

    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    const handleSend = () => {
      const val = userInput.value.trim();
      if (val !== "") {
        this.setDialogue(`Você enviou: "${val}"`);
        userInput.value = "";
      }
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (userInput) {
      userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("capri-viewport");
  window.capriController = new CapriBehaviorController(viewport);
});
