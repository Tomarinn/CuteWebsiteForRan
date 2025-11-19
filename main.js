window.onload = () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  // --- starting placement for no button
  let currentX = yesBtn.offsetLeft + yesBtn.offsetWidth + 36;
  let currentY = yesBtn.offsetTop;

  let targetX = currentX;
  let targetY = currentY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${currentX}px`;
  noBtn.style.top = `${currentY}px`;

  const safeDistance = 100;
  const speed = 0.12; 


  // Get update on mouse position
  document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = btnX - e.clientX;
    const dy = btnY - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < safeDistance) {
      const angle = Math.atan2(dy, dx);

      // Pushing the button away from mouse
      targetX = currentX + Math.cos(angle) * (safeDistance - distance);
      targetY = currentY + Math.sin(angle) * (safeDistance - distance);

      //make it not run out of the screen
      const rectNow = noBtn.getBoundingClientRect();
      const maxX = window.innerWidth 
      const maxY = window.innerHeight

      if (targetX < -maxX+900) targetX = -rectNow.height;
      if (targetX > maxX-800) targetX = rectNow.height;
      if (targetY < -500) targetY = -500 + rectNow.height;
      if (targetY > 340) targetY = rectNow.height;
    }
  });

  // Animation loop
  function animate() {
    // Smooth movement
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    noBtn.style.left = `${currentX}px`;
    noBtn.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
  }

  animate(); 

  yesBtn.addEventListener("click", () => {
    window.location.href = "carousel.html";
  });
};
