document.addEventListener('DOMContentLoaded', () => {
  const puzzleContainer = document.getElementById('puzzle-container');
  const imageSrc = 'jigsaw.jpeg';  // Path to your image

  const rows = 3; // Number of rows for the puzzle (3x3 grid)
  const cols = 3; // Number of columns for the puzzle (3x3 grid)

  // Create puzzle pieces dynamically
  function createPuzzle() {
    let pieces = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;  // Adjust background position
        piece.setAttribute('draggable', true);
        piece.setAttribute('data-pos', `${row}-${col}`);
        piece.style.left = `${Math.random() * 200}px`; // Randomize initial position
        piece.style.top = `${Math.random() * 200}px`;
        pieces.push(piece);
        puzzleContainer.appendChild(piece);
      }
    }
    return pieces;
  }

  // Handle drag and drop
  let draggedPiece = null;

  document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('piece')) {
      draggedPiece = e.target;
    }
  });

  puzzleContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  puzzleContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedPiece) {
      const targetPos = e.target.getBoundingClientRect();
      const draggedPos = draggedPiece.getBoundingClientRect();
      const diffX = e.clientX - draggedPos.width / 2;
      const diffY = e.clientY - draggedPos.height / 2;

      draggedPiece.style.left = `${diffX - targetPos.left}px`;
      draggedPiece.style.top = `${diffY - targetPos.top}px`;

      // Add more logic here to snap the piece to its correct position
    }
  });

  // Initialize puzzle
  createPuzzle();
});
