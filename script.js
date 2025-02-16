// Configuration
const imageSrc = 'jigsaw.jpeg';  // Replace with your image file path
const rows = 3;  // Number of rows
const cols = 3;  // Number of columns
const puzzleArea = document.getElementById("puzzle");
const pieceWidth = 100;  // Width of each puzzle piece
const pieceHeight = 100; // Height of each puzzle piece

// Load image and split it into pieces
const image = new Image();
image.src = imageSrc;
image.onload = () => {
    generatePuzzle(image);
};

// Create puzzle pieces
function generatePuzzle(image) {
    puzzleArea.innerHTML = ''; // Clear any existing puzzle

    let pieceIndex = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement("div");
            piece.classList.add("puzzle-piece");
            
            // Set background position to extract the correct part of the image
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            // Position the piece on the grid
            piece.style.top = `${row * pieceHeight}px`;
            piece.style.left = `${col * pieceWidth}px`;

            // Enable drag-and-drop
            piece.draggable = true;
            piece.setAttribute("data-index", pieceIndex);
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);
            piece.addEventListener("dragend", dragEnd);
            
            puzzleArea.appendChild(piece);
            pieceIndex++;
        }
    }
}

// Handle drag start
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.index);
}

// Allow the drop
function dragOver(event) {
    event.preventDefault();
}

// Handle drop
function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text");
    const draggedPiece = document.querySelectorAll(".puzzle-piece")[draggedIndex];
    const targetPiece = event.target;

    // Swap the positions of the dragged piece and target piece
    const tempTop = draggedPiece.style.top;
    const tempLeft = draggedPiece.style.left;

    draggedPiece.style.top = targetPiece.style.top;
    draggedPiece.style.left = targetPiece.style.left;

    targetPiece.style.top = tempTop;
    targetPiece.style.left = tempLeft;
}

// Handle drag end
function dragEnd() {
    // Optional: check if the puzzle is solved
}

