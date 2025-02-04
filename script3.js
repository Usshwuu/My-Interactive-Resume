document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const flagPole = document.getElementById("flagPole");
  const flagPoleText = document.getElementById("flagPoleText");

  // The text inside the box images (including those in the mid section)
  const boxsText = document.getElementById("boxsText");
  const boxsTextMid1 = document.getElementById("boxsTextMid1");
  const boxsTextMid2 = document.getElementById("boxsTextMid2");

  const body = document.querySelector("body");

  let playerX = 0;
  let playerY =
    document.querySelector(".header").getBoundingClientRect().top - 40;

  const moveSpeed = 30;
  const fallSpeed = 80;
  const jumpHeight = 100;
  const jumpSpeed = 120;
  let jumpStartY = playerY;

  let isFalling = false;
  let isJumping = false;

  let interactedWithFlagPole = false;

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

  // Modified isBoxBelow function to also check for .pst elements
  function isBoxBelow(x, y) {
    const boxes = document.querySelectorAll("#box, .pst"); // Check both #box and .pst
    for (let box of boxes) {
      const boxRect = box.getBoundingClientRect();
      if (
        x >= boxRect.left &&
        x <= boxRect.right &&
        y + 40 >= boxRect.top &&
        y + 40 <= boxRect.bottom
      ) {
        return boxRect.top;
      }
    }
    return false;
  }

  function isNearFlagPole() {
    const poleRect = flagPole.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    const distanceX = Math.abs(
      playerRect.left +
        playerRect.width / 2 -
        (poleRect.left + poleRect.width / 2)
    );
    const distanceY = Math.abs(
      playerRect.top +
        playerRect.height / 2 -
        (poleRect.top + poleRect.height / 2)
    );

    return distanceX < 50 && distanceY < 50; // Adjust the distance as necessary
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      playerX -= moveSpeed;
      updatePlayerSprite("left");
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      playerX += moveSpeed;
      updatePlayerSprite("right");
    }

    if (e.key === " " && !isJumping && !isFalling) {
      isJumping = true;
      jumpStartY = playerY;
    }

    const boxBelow = isBoxBelow(playerX, playerY);
    if (boxBelow === false) {
      isFalling = true;
    } else {
      isFalling = false;
      playerY = boxBelow - 40; // Player should land on the box
    }

    if (isJumping) {
      playerY -= jumpSpeed;
      if (playerY <= jumpStartY - jumpHeight) {
        isJumping = false;
      }
    }

    if (isFalling) {
      playerY += fallSpeed;
    }

    const bodyWidth = body.offsetWidth;
    const playerWidth = player.offsetWidth;
    if (playerX < 0) playerX = 0;
    if (playerX > bodyWidth - playerWidth) playerX = bodyWidth - playerWidth;

    const bodyHeight = body.offsetHeight;
    if (playerY < 0) playerY = 0;
    if (playerY > bodyHeight - player.offsetHeight)
      playerY = bodyHeight - player.offsetHeight;

    // If player is near the flag pole and hasn't interacted yet
    if (isNearFlagPole() && !interactedWithFlagPole) {
      flagPoleText.style.display = "block";
      interactedWithFlagPole = true;

      // Show the text inside all #boxs elements (header and mid sections)
      boxsText.style.display = "block"; // Header box
      boxsTextMid1.style.display = "block"; // First mid box
      boxsTextMid2.style.display = "block"; // Second mid box
    }

    player.style.left = `${Math.round(playerX)}px`;
    player.style.top = `${Math.round(playerY)}px`;
  });

  player.style.left = `${Math.round(playerX)}px`;
  player.style.top = `${Math.round(playerY)}px`;
});
