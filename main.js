'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

//let startStack = "a";
//let endStack =  "c";

//let startStack = 'a';
//let endStack = 'c';

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


const movePiece = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    const disc = stacks[startStack].pop();
    
    stacks[endStack].push(disc);
  } else {
    console.log("Invalid move! Please try again.");
  }

}

const isLegal = (startStack, endStack) => {
  if (stacks[startStack].length === 0) {
    return false;
  }
  
  const startDisc = stacks[startStack][stacks[startStack].length - 1];
  
  if (!stacks[endStack][0] || startDisc < stacks[endStack][stacks[endStack].length -1]) {
    return true;
  } else {
    return false;
  }
};

const checkForWin = () => {
  if (stacks.b.length === 4 || stacks.c.length === 4 ) {
    console.log("Winner!");
    return true;
  } else {
    return false;
  }
}

const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
  checkForWin();
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack.toLowerCase(), endStack.toLowerCase());
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block to B', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
    it('EXTRA TEST 1: should be able to move a block to C', () => {
      towersOfHanoi('a', 'c');
      assert.deepEqual(stacks, { a: [4, 3], b: [1], c: [2] });
    });
  });


  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('EXTRA TEST 2: should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [],
        c: [1]
      };
      assert.equal(isLegal('a', 'c'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('EXTRA TEST 3: should allow a legal move', () => {
      stacks = {
        a: [],
        b: [],
        c: [4, 3, 2, 1]
      };
      assert.equal(isLegal('c', 'a'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
