const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resize-btn");

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function paintSquare(square) {
  // First visit: give the square a random color and start at 10% darkness
  if (!square.dataset.painted) {
    square.dataset.painted = "true";
    square.dataset.darkness = "0";
    square.style.backgroundColor = randomColor();
  }

  // Each visit adds 10% black, so the square is fully black after 10 visits
  const darkness = Math.min(Number(square.dataset.darkness) + 0.1, 1);
  square.dataset.darkness = darkness;
  square.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${darkness}), rgba(0, 0, 0, ${darkness}))`;
}

function createGrid(size) {
  container.innerHTML = ""; // remove the old grid

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.addEventListener("mouseenter", () => paintSquare(square));
    container.appendChild(square);
  }
}

resizeBtn.addEventListener("click", () => {
  const input = prompt("Squares per side? (1-100)");
  if (input === null) return; // user pressed Cancel

  const size = parseInt(input, 10);
  if (Number.isNaN(size) || size < 1 || size > 100) {
    alert("Please enter a whole number from 1 to 100.");
    return;
  }
  createGrid(size);
});

createGrid(16);