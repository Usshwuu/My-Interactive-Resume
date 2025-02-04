document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const ladders = document.querySelectorAll(".ladder"); // Get all ladders
  let playerPosY = 0;
  let playerPosX = window.innerWidth / 2; // Starting X position in the center (not used for horizontal movement)
  let movingUp = false;
  let movingDown = false;

  player.style.bottom = `${playerPosY}px`;
  player.style.left = `${playerPosX}px`;

  const moveSpeed = 10;
  const scrollThreshold = 90; // Distance from the edge of the screen to trigger scrolling
  let scrollTimer = null; // Timer for 5 seconds
  let scrollStartTime = 0; // To track when scrolling starts

  // Prevent default key behavior (e.g., stop scrolling with WASD or arrow keys)
  document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "w", "s"].includes(e.key)) {
      e.preventDefault();
    }

    // Determine if player is near any ladder for vertical movement
    ladders.forEach((ladder) => {
      const ladderTop = ladder.offsetTop;
      const ladderBottom = ladderTop + ladder.offsetHeight;
      const ladderLeft = ladder.offsetLeft;
      const ladderRight = ladderLeft + ladder.offsetWidth;

      const playerLeft = playerPosX;
      const playerRight = playerLeft + player.offsetWidth;
      const playerBottom = playerPosY;
      const playerTop = playerBottom + player.offsetHeight;

      const nearLadder =
        playerRight > ladderLeft &&
        playerLeft < ladderRight &&
        playerTop > ladderTop &&
        playerBottom < ladderBottom;

      // If player is near the ladder, allow movement up/down
      if (nearLadder) {
        // Center player horizontally on the ladder
        playerPosX =
          ladderLeft + ladder.offsetWidth / 2 - player.offsetWidth / 2;
        player.style.left = `${playerPosX}px`;

        if (e.key === "ArrowUp" || e.key === "w") {
          if (playerPosY < ladderBottom - player.offsetHeight) {
            movingUp = true;
            movingDown = false;

            // Start the scroll timer if the player begins to climb
            if (!scrollTimer) {
              scrollStartTime = Date.now();
              scrollTimer = setInterval(scrollPage, 50); // Scroll every 50ms
            }
          }
        } else if (e.key === "ArrowDown" || e.key === "s") {
          if (playerPosY > ladderTop) {
            movingDown = true;
            movingUp = false;
          }
        }
      }
    });
  });

  document.addEventListener("keyup", (e) => {
    // Stop vertical movement when the key is released
    if (e.key === "ArrowUp" || e.key === "w") {
      movingUp = false;
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      movingDown = false;
    }
  });

  // Function to scroll the page
  function scrollPage() {
    if (movingUp) {
      playerPosY += moveSpeed;
      player.style.bottom = `${playerPosY}px`;
      player.style.backgroundImage = "url('assets/playerUp.png')";

      // Auto-scroll the page if the player reaches the top or bottom edge of the screen
      if (
        playerPosY + player.offsetHeight >
        window.scrollY + window.innerHeight - scrollThreshold
      ) {
        window.scrollBy(0, moveSpeed);
      }

      if (playerPosY < window.scrollY + scrollThreshold) {
        window.scrollBy(0, -moveSpeed);
      }

      // Check if 5 seconds have passed since scrolling started
      const elapsedTime = Date.now() - scrollStartTime;
      console.log(`Elapsed time: ${elapsedTime}ms`);

      if (elapsedTime >= 4000) {
        console.log("3 seconds passed, redirecting now...");
        clearInterval(scrollTimer); // Stop the scrolling
        window.location.href = "index3.html"; // Update with the correct file path for your third page
      }
    }

    if (movingDown) {
      playerPosY -= moveSpeed;
      player.style.bottom = `${playerPosY}px`;
      player.style.backgroundImage = "url('assets/playerDown.png')";
    }
  }

  // Continuous movement check
  setInterval(scrollPage, 50); // Update every 50ms for smooth movement
});
