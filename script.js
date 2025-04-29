let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  // init(paper) {
  //   document.addEventListener('mousemove', (e) => {
  //     if(!this.rotating) {
  //       this.mouseX = e.clientX;
  //       this.mouseY = e.clientY;
        
  //       this.velX = this.mouseX - this.prevMouseX;
  //       this.velY = this.mouseY - this.prevMouseY;
  //     }
        
  //     const dirX = e.clientX - this.mouseTouchX;
  //     const dirY = e.clientY - this.mouseTouchY;
  //     const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
  //     const dirNormalizedX = dirX / dirLength;
  //     const dirNormalizedY = dirY / dirLength;

  //     const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
  //     let degrees = 180 * angle / Math.PI;
  //     degrees = (360 + Math.round(degrees)) % 360;
  //     if(this.rotating) {
  //       this.rotation = degrees;
  //     }

  //     if(this.holdingPaper) {
  //       if(!this.rotating) {
  //         this.currentPaperX += this.velX;
  //         this.currentPaperY += this.velY;
  //       }
  //       this.prevMouseX = this.mouseX;
  //       this.prevMouseY = this.mouseY;

  //       paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  //     }
  //   })

  //   paper.addEventListener('mousedown', (e) => {
  //     if(this.holdingPaper) return; 
  //     this.holdingPaper = true;
      
  //     paper.style.zIndex = highestZ;
  //     highestZ += 1;
      
  //     if(e.button === 0) {
  //       this.mouseTouchX = this.mouseX;
  //       this.mouseTouchY = this.mouseY;
  //       this.prevMouseX = this.mouseX;
  //       this.prevMouseY = this.mouseY;
        
  //     }
  //     if(e.button === 2) {
  //       this.rotating = true;
  //     }
  //   });
  //   window.addEventListener('mouseup', () => {
  //     this.holdingPaper = false;
  //     this.rotating = false;
      
  //   });
  // }
  init(paper) {
    const handleMove = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
  
      const dirX = x - this.mouseTouchX;
      const dirY = y - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
  
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }
  
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
  
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };
  
    document.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });
  
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }

      document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          e.preventDefault(); // ✅ Prevent scrolling
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        }
      }, { passive: false }); // important: passive must be false
      
    });





  
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
  
      if (e.button === 2) {
        this.rotating = true;
      }
    });
  
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
  
      const touch = e.touches[0];
      this.mouseTouchX = touch.clientX;
      this.mouseTouchY = touch.clientY;
      this.prevMouseX = touch.clientX;
      this.prevMouseY = touch.clientY;
    });
  
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
  
}





const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// Launch confetti when page loads
window.addEventListener('load', () => {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.3 }
    });
  });
  window.addEventListener('load', () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.3 }
    });
  
    // Show paper elements with animation
    const papers = document.querySelectorAll('.paper');
    papers.forEach((paper, i) => {
      setTimeout(() => {
        paper.classList.add('show');
      }, i * 100); // Stagger the animation
    });
  });

  document.addEventListener('touchend', () => {
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.6 }
    });
  });
  
  document.querySelector('.heart').addEventListener('touchend', () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.5 } });
  });
  
  const heart = document.querySelector(".paper.heart");
const clickSound = document.getElementById("click-sound");

const triggerHeartTap = (e) => {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  clickSound.currentTime = 0;
  clickSound.play();

  const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
  burstHearts(x, y);
};

heart.addEventListener("click", triggerHeartTap);
heart.addEventListener("touchend", triggerHeartTap);


  function burstHearts(x, y) {
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "fixed";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = "16px";
      heart.style.pointerEvents = "none";
      heart.style.opacity = 1;
  
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 60 + 20;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
  
      document.body.appendChild(heart);
  
      heart.animate(
        [
          { transform: `translate(0, 0)`, opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
        ],
        {
          duration: 800,
          easing: "ease-out"
        }
      );
  
      setTimeout(() => heart.remove(), 800);
    }
  }
  
  document.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0]; // ✅ Get actual touch position
  const balloon = document.createElement("div");
  balloon.textContent = "⭐";
  balloon.style.position = "fixed";
  balloon.style.left = `${touch.clientX}px`;
  balloon.style.top = `${touch.clientY}px`;
  balloon.style.fontSize = "30px";
  balloon.style.opacity = 1;
  balloon.style.transition = "transform 2s ease-out, opacity 2s ease-out";
  document.body.appendChild(balloon);

  requestAnimationFrame(() => {
    balloon.style.transform = `translateY(-200px)`;
    balloon.style.opacity = 0;
  });

  setTimeout(() => {
    balloon.remove();
  }, 3000);
});

  
