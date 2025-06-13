// Arrays in JS | PACKED vs HOLEY | JSVU (Javascript (engine) Version Updater) | V8-debug

const myArr = []
// %DebugPrint(myArr)

// continuous, holey 

// SMI (small integer)
// Packed element
// Double (float, string, function)

const arrTwo = [1, 2, 3, 4, 5]
// PACKED SMI ELEMENTS

arrTwo.push(6.0)
// PACKED DOUBLE ELEMENTS

arrTwo.push('7')
// PACKED ELEMENTS

arrTwo[10] = 11
// HOLEY ELEMENTS

console.log(arrTwo);
console.log(arrTwo.length);
console.log(arrTwo[9]);


// bound check 
// hasOwnProperty(arrTwo, 9)
// hasOwnProperty(arrTwo.prototype, 10)
// hasOwnProperty(Object.prototype, 10)

//holes are very expensive in js


const arrThree = [1, 2, 3, 4, 5]
console.log(arrThree[2]);

// SMI > DOUBLE > PACKED
// H_SMI > H_DOUBLE > H_PACKED


const arrFour = new Array(3)
// just 3 holes. HOLEY SMI ELEMENTS
arrFour[0] = '1' // HOLEY ELEMENTS
arrFour[1] = '2' // HOLEY ELEMENTS
arrFour[2] = '3' // HOLEY ELEMENTS

const arrFive = []
arrFive.push('1') // PACKED ELEMENTS
arrFive.push('2') // PACKED ELEMENTS
arrFive.push('3') // PACKED ELEMENTS

const arrSix = [1, 2 , 3, 4, 5]
arrSix.push(NaN)
arrSix.push(Infinity)



// for, forin, for-of, forEach