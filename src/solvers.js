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
  var solution = makeEmptyMatrix(n);
  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n){
    var solutionCount = 1;
    for (var i = 1; i <= n; i++){
      solutionCount *= i;
    }
  }else{
    return 0;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0){
    return [];
  }
  var solution = makeEmptyMatrix(n);
  var startPosition = [];
  // for (var l = 0; l < n; l++){
  //   startPosition.push([0, l]);
  // }
  // for (var m = 0; m < n; m++){
  //   var arrStore = [startPosition[m]]; // [[0,0],[1,]]
  //   for (var i = 1; i < n; i++) {
  //     for (var j = 0; j < n; j++){
  //       var flag = true;
  //       var numOfFails = 0
  //       for (var k = 0; k < arrStore.length; k++){
  //         if (!checkAttack(arrStore[k], [i, j])){
  //           flag = false;
  //         }
  //       }
  //       if (flag){
  //         arrStore.push([i, j]);
  //       }else {
  //         numOfFails += 1;
  //       }
  //       }
  //     if (numOfFails === n){
  //       arrStore.pop();
  //     }
  //   }
  // }


  if (arrStore.length != n){
    return makeEmptyMatrix(n);
  }
  for (var o = 0; o < n; o++){
    solution[o][arrStore[o][1]] = 1;
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var checkAttack = function(arr1,arr2) {
  if(arr2 === undefined){
    return false;
  }
  return !(arr1[0]=== arr2[0] || arr1[1] === arr2[1] || arr2[0] - arr1[0] === arr2[1] - arr1[1] || arr2[0] - arr1[0] === arr1[1] - arr2[1])
}

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

var Tree = function(value) {
  var newTree =Object.create(treeMethods);
  newTree.value = value;
  newTree.children = [];
  return newTree;
};

var checkAttack = function(arr1,arr2) {
  if(arr2 === undefined){
    return false;
  }
  return !(arr1[0]=== arr2[0] || arr1[1] === arr2[1] || arr2[0] - arr1[0] === arr2[1] - arr1[1] || arr2[0] - arr1[0] === arr1[1] - arr2[1])
}

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  this.children.push(child);
};



treeMethods.parent = function(value){
  var result;
  function recursion(obj){
    if (result){
      return
    }
    if (obj.children){
      for (var i = 0; i < obj.children.length; i++){
        if (result){
          break;
        }
        if(obj.children[i].value === value){
          result = obj.value;
          break;
        }else{
          recursion(obj.children[i]);
        }
      };
    }
  }
  recursion(this);
  return result? result : null;
}



var queens = Tree([]);
for (var i = 0; i < n; i++){
  queens.addChild([0, i]);
}

var findChildren = function(node){
  if (node.value[0]=== n - 1){
    return;
  }
  for (var i = 0; i < n; i++){
    function recursion(value){
      if (!value){
        return true
      }
      if (checkAttack(value, [node.value[0] + 1, i])){
        return recursion(node.parent(value));
      }else{
        return false
      }
    }
    if (recursion(node)){
       node.addChild([node.value[0] + 1, i]);
    }

  }
  if (node.children){
    for (var j = 0; j < node.children.length; j++){
      findChildren(node.children[j]);
    }
  }
}
queens.children.forEach(function(arr){
  findChildren(arr);
});
var queenStore = [];
var findQueens = function(node){
  if (node.value.length === n){
    queenStore.push(node.value);
    return;
  }
  for (var i = 0; i < node.children.length; i++){
    node.children[i].value = node.value.concat([node.children[i].value[1]]);
    findQueens(node.children[i]);
  }
}
findQueens(queens);