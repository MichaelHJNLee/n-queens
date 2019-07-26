/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]]
  }
  var roots = [];
  for (var i = 0; i < n; i++) {
    roots.push([0,i]);
  }
  var coordArr = [];
  var coord = [];
  var counter = 1;
  var rootNum = 0;
  var findChildren = function(arr) {
      if (counter === n) {
        return;
      }
    var storage = [];
    var recursion = function(brr) {
      storage.push(brr);
      if (storage.length === n) {
        var hold = storage;
        coordArr.push(storage);
        storage = hold.slice(0, hold.length - 1);
        return;
      }
      for (var i = brr[0]; i <= brr[0] + 1; i++) {
        for (var j = 0; j < n; j++) {
          var flag = true;
          for (var k = 0; k < storage.length; k++) {
            if (storage[k][0] === i || storage[k][1] === j) {
              flag = false;
            }
          }
          if (flag === true) {
            recursion([i,j]);
          }
        }
      }
      var otherHold = storage;
      storage = otherHold.slice(0, otherHold.length - 1);
    }
   recursion(arr);
 }
  for (var i = 0; i < roots.length; i++) {
    findChildren(roots[i]);
    if (coordArr.length) {
      break;
    }
    rootNum++;
    coord = [];
  }
  var solution = makeEmptyMatrix(n);
  if (coordArr.length !== 0) {
      coordArr[0].forEach(function(arr){
      solution[arr[0]][arr[1]] = 1;
    })
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


window.countNRooksSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  var roots = [];
  for (var i = 0; i < n; i++) {
    roots.push([0,i]);
  }
  var coordArr = [];
  var coord = [];
  var counter = 1;
  var rootNum = 0;
  var findChildren = function(arr) {
      if (counter === n) {
        return;
      }
    var coord = [];
    var recursion = function(brr) {
      coord.push(brr);
      if (coord.length === n) {
        var hold = coord;
        coordArr.push(coord);
        coord = hold.slice(0, hold.length - 1);
        return;
      }
      for (var i = brr[0]; i <= brr[0] + 1; i++) {
        for (var j = 0; j < n; j++) {
          var flag = true;
          for (var k = 0; k < coord.length; k++) {
            if (coord[k][0] === i || coord[k][1] === j) {
              flag = false;
            }
          }
          if (flag === true) {
            recursion([i,j]);
          }
        }
      }
      var otherHold = coord;
      coord = otherHold.slice(0, otherHold.length - 1);
    }
   recursion(arr);
 }

  for (var i = 0; i < roots.length; i++) {
    findChildren(roots[i]);
    rootNum++;
    coord = [];
  }
  console.log('Number of solutions for ' + n + ' rooks:', coordArr.length);
  return coordArr.length;
}


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var Tree = function(value) {
    var newTree =Object.create(treeMethods);
    newTree.value = value;
    newTree.children = [];
    newTree.parent = []
    return newTree;
  };
  var treeMethods = {};

  treeMethods.addChild = function(value) {
    var child = Tree(value);
    if (this.value.length){
      child.parent = this.parent.concat([this.value])
    }
    this.children.push(child);
  };

  var queens = Tree([]);

  for (var i = 0; i < n; i++){
    queens.addChild([0, i]);
  }

  var queenStore =[];

  var findChildren = function(node){
    if (node.value[0]=== n - 1){
      queenStore.push(node.parent.concat([node.value]))
      return;
    }
    for (var i = 0; i < n; i++){
      var flag = true;
      if (!node.parent.length){
        if (!checkAttack(node.value, [node.value[0] + 1, i])){
          flag = false;
        }
      } else {
        for (var j = 0; j < node.parent.length; j++){
          if (!checkAttack(node.parent[j], [node.value[0] + 1, i])){
            flag = false;
            break;
          }
          if (!checkAttack(node.value, [node.value[0] + 1, i])){
            flag = false;
            break;
          }
        }
      }
      if (flag){
         node.addChild([node.value[0] + 1, i]);
      }
    }
    if (node.children){
      for (var k = 0; k < node.children.length; k++){
        findChildren(node.children[k]);
      }
    }
  }
  queens.children.forEach(function(arr){
    findChildren(arr);
  });
  var solution = makeEmptyMatrix(n);
  if (queenStore.length !== 0) {
      queenStore[0].forEach(function(arr){
      solution[arr[0]][arr[1]] = 1;
    })
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var Tree = function(value) {
    var newTree =Object.create(treeMethods);
    newTree.value = value; //[0,0]
    newTree.children = [];
    newTree.parent = []
    return newTree;
  };
  var treeMethods = {};

  treeMethods.addChild = function(value) {
    var child = Tree(value);
    if (this.value.length){
      child.parent = this.parent.concat([this.value])
    }
    this.children.push(child);
  };

  var queens = Tree([]);

  for (var i = 0; i < n; i++){
    queens.addChild([0, i]);
  }
  var queenStore =[];

  var findChildren = function(node){
    if (node.value[0]=== n - 1){
      queenStore.push(node.parent.concat([node.value]))
      return;
    }
    for (var i = 0; i < n; i++){
      var flag = true;
      if (!node.parent.length){
        if (!checkAttack(node.value, [node.value[0] + 1, i])){
          flag = false;
        }
      }else{
        for (var j = 0; j < node.parent.length; j++){
        if (!checkAttack(node.parent[j], [node.value[0] + 1, i])){
          flag = false;
          break;
        }
        if (!checkAttack(node.value, [node.value[0] + 1, i])){
          flag = false;
          break;
        }
      }
      }
      if (flag){
        node.addChild([node.value[0] + 1, i]);
      }
    }
    if (node.children){
      for (var k = 0; k < node.children.length; k++){
        findChildren(node.children[k]);
      }
    }
  }
  queens.children.forEach(function(arr){
    findChildren(arr);
  });
  console.log('Number of solutions for ' + n + ' queens:', queenStore.length);
  return queenStore.length;
};

var checkAttack = function(arr1,arr2) {
  if(arr2 === undefined){
    return false;
  }
  return !(arr1[0]=== arr2[0] || arr1[1] === arr2[1] || arr2[0] - arr1[0] === arr2[1] - arr1[1] || arr2[0] - arr1[0] === arr1[1] - arr2[1])
}

var checkAttackRooks = function(arr1,arr2) {
  if(arr2 === undefined){
    return false;
  }
  return !(arr1[0]=== arr2[0] || arr1[1] === arr2[1]);
}

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};







