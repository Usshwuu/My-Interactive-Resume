document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const portal = document.querySelector(".port");

  // Set initial position for player at the middle left of the screen
  let playerX = 0;
  let playerY = window.innerHeight / 2 - 40; // Position in the middle vertically

  const moveSpeed = 30; // Adjust this value for speed
  let interactedFishes = []; // Array to track interacted fish

  // Ensure the player element has an exact size to prevent pixel misalignment
  player.style.width = "50px"; // Example width, adjust as needed
  player.style.height = "80px"; // Example height, adjust as needed

  // Function to update player sprite based on direction
  function updatePlayerSprite(direction) {
    switch (direction) {
      case "up":
        player.style.backgroundImage = "url('assets/playerUp.png')";
        break;
      case "down":
        player.style.backgroundImage = "url('assets/playerDown.png')";
        break;
      case "left":
        player.style.backgroundImage = "url('assets/playerLeft.png')";
        break;
      case "right":
        player.style.backgroundImage = "url('assets/playerRight.png')";
        break;
    }
  }

  // Function to update player position
  function updatePlayerPosition() {
    player.style.left = Math.round(playerX) + "px"; // Ensure pixel alignment
    player.style.top = Math.round(playerY) + "px"; // Ensure pixel alignment
  }

  // Move the player on arrow key press or WASD keys
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      playerY -= moveSpeed;
      updatePlayerSprite("up");
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      playerY += moveSpeed;
      updatePlayerSprite("down");
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      playerX -= moveSpeed;
      updatePlayerSprite("left");
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      playerX += moveSpeed;
      updatePlayerSprite("right");
    }

    // Update player position
    updatePlayerPosition();

    // Check for collision with the portal
    checkPortalCollision();
  });

  // Set initial player sprite (facing down)
  updatePlayerSprite("down");

  // Set the initial player position on screen
  updatePlayerPosition();

  // Check if the player is near the portal
  function checkPortalCollision() {
    const portalRect = portal.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // Check if the player is within the portal's area
    if (
      playerRect.left < portalRect.right &&
      playerRect.right > portalRect.left &&
      playerRect.top < portalRect.bottom &&
      playerRect.bottom > portalRect.top
    ) {
      // Redirect to the second page when the player is near the portal
      window.location.href = "index2.html"; // Redirect to the second page (secondPage.html)
    }
  }

  const fishElements = document.querySelectorAll(".fish");
  const fishInfos = document.querySelectorAll(".fish-info");

  // Collision detection between player and fish
  function checkCollision() {
    fishElements.forEach((fish, index) => {
      const fishRect = fish.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();

      if (
        playerRect.left < fishRect.right &&
        playerRect.right > fishRect.left &&
        playerRect.top < fishRect.bottom &&
        playerRect.bottom > fishRect.top
      ) {
        // Fish stops moving and aligns in the middle
        fish.classList.add("stopped");

        // Show fish info if it hasn't been interacted with before
        if (!interactedFishes.includes(index)) {
          fishInfos[index].style.display = "block"; // Show the fish info
          interactedFishes.push(index); // Mark this fish as interacted
        }
      }
    });
  }

  // Start checking collisions every 50ms
  setInterval(checkCollision, 50);
});
