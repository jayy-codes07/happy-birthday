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
  