
let stone = null;

const stacks = {
  a: [],
  b: [],
  c: []
};

const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row");
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)

  pickUpStone(row.id)
} 

function drag(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}


function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const stoneId = event.dataTransfer.getData("text/plain");
  dropStone(event.target.id, stoneId);
}

const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);

  if (!selectedRow || !selectedRow.hasChildNodes()) {
    return;
  }

  stone = selectedRow.removeChild(selectedRow.lastChild);
  console.log(`The stone has been picked up: ${stone}`);
}

const dropStone = (rowID, stoneId) => {
  const selectedRow = document.getElementById(rowID);
  const stoneElement = document.getElementById(stoneId);
  
  if (!selectedRow || !stoneElement) {
    return;
  }

  const lastStone = selectedRow.lastElementChild;
  
  if (!lastStone) {
    selectedRow.appendChild(stoneElement);
    checkForWin();
    return;
  }

  const endDiscSize = parseInt(lastStone.getAttribute("data-size"));
  const stoneSize = parseInt(stoneElement.getAttribute("data-size"));
  
  if (stoneSize < endDiscSize) {
    selectedRow.appendChild(stoneElement);
    checkForWin();
  }
};

const checkForWin = () => {
  const rowB = document.getElementById("b");
  const rowC = document.getElementById("c");

  if (rowB.childElementCount === 4 || rowC.childElementCount === 4 ) {
    window.alert("Winner!");
    //window.location.reload(); 
  }
};


const towersOfHanoi = () => {
  const stoneA = document.getElementById("a");

  stoneA.addEventListener("click", () => {
    dropStone("a", "stoneA");
    checkForWin();
  });
};



const stoneElements = document.querySelectorAll(".stone");
stoneElements.forEach((stoneElement) => {
  stoneElement.addEventListener("dragstart", drag );
});

const rowElements = document.querySelectorAll(".row");
rowElements.forEach((rowElement) => {
  rowElement.addEventListener("dragover", allowDrop);
  rowElement.addEventListener("drop", drop);
});