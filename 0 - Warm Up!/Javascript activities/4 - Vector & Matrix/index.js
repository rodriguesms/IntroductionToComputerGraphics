var vectorList = []
var matrixList = []

const createVector = (var1, var2, var3, forMatrix=false) => {

    //Checking if the variables were passed as empty string aka "", if so, they're assigned as 0 | if they're not, they're converted to integers
    (var1==="" ? var1=0 : var1=parseInt(var1));
    (var2==="" ? var2=0 : var2=parseInt(var2));
    (var3==="" ? var3=0 : var3=parseInt(var3));

    if(forMatrix!=false){ // this forMatrix flag indicates if the Vector is created to a matrix object, if it is, it does not save the vector object in the vector's array
        return new Vector(var1, var2, var3);
    }else{
        vectorList.push(new Vector(var1, var2, var3));
        vectorList[vectorList.length-1].displayVector();
    }
}

const createMatrix = (var11=0, var12=0, var13=0, 
                    var21=0, var22=0, var23=0,
                    var31=0, var32=0, var33=0) => { // It creates a new matrix. Each value of the matrix is assigned to 0 by default.

    matrixList.push(new Matrix(
        createVector(var11, var21, var31, true), //creating vectors that represents each column
        createVector(var12, var22, var32, true), // the true param means it is a vector to a matrix creation, só it doesn't need to be saved into the vector's array
        createVector(var13, var23, var33, true)
    ));

    matrixList[matrixList.length-1].displayMatrix(); // Shows the last element in the Matrix array into the browser
}

const showAllVectors = () => { // Shows all vectors created in this session (before the page is refreshed or closed) into console
    console.clear() // Cleans the console before showing it
    let cont = 0;
    vectorList.forEach(element => {
        console.log(element.toString(cont)); // Calls the toString() method which shows the vector in the browser
        cont++; // cont here is used as vector's id
    });
}

const showAllMatrices = () => { // Shows all matrices created in this session (before the page is refreshed or closed) into console
    console.clear()
    let cont = 0;
    matrixList.forEach(element => {
        console.log(element.toString(cont));
        cont++;
    });
}

// ON THE OPERATIONS FUNCTIONS, I'VE PUT A CONDITION THAT THE VECTORS'/MATRICES' IDS SHOULD NOT BE THE SAME
// ONLY AT VECTOR x MATRIX OPERATIONS, THAT IS ALLOWED

const multiplyTwoMatrices = (id1, id2) => { 
    
    // check if those id's are valid (present in the matrix array), if so, they're converted into integers
    // Basically, all the following functions have the same logic, so i will keep the comments in here

    (id1==="" ? id1=0 : id1=parseInt(id1));
    (id2==="" ? id2=0 : id2=parseInt(id2));

    if(matrixList.length > id1 && matrixList.length > id2 && id1!=id2 && id1 >= 0 && id2 >= 0)
        console.log(matrixList[id1].productBetweenMatrices(matrixList[id2]).toString());
    else
        alert("You're trying to access a non-existing matrix!");
}

const getMatrixDeterminant = (id) => {
    
    (id==="" ? id=0 : id=parseInt(id));

    if(matrixList.length > id && id >= 0)
        console.log(`Determinant of Matrix [${id}] = ${matrixList[id].matrixDeterminant()}`);
    else
        alert("You're trying to access a non-existing matrix!");
}

const getMatrixTransposal = (id) => {

    (id==="" ? id=0 : id=parseInt(id));

    if(matrixList.length > id && id >= 0)
        console.log(`Transposal of Matrix [${id}] = ${matrixList[id].matrixTransposal().toString()}`);
    else
        alert("You're trying to access a non-existing matrix!");
}

const getDotProduct = (id1, id2) => {
    (id1==="" ? id1=0 : id1=parseInt(id1));
    (id2==="" ? id2=0 : id2=parseInt(id2));

    if(vectorList.length > id1 && vectorList.length > id2 && id1!=id2 && id1 >= 0 && id2 >= 0)
        console.log(vectorList[id1].dotProduct(vectorList[id2]));
    else
        alert("You're trying to access a non-existing vector!");
}

const getCrossProduct = (id1, id2) => {
    (id1==="" ? id1=0 : id1=parseInt(id1));
    (id2==="" ? id2=0 : id2=parseInt(id2));

    if(vectorList.length > id1 && vectorList.length > id2 && id1!=id2 && id1 >= 0 && id2 >= 0)
        console.log(vectorList[id1].crossProduct(vectorList[id2]).toString());
    else
        alert("You're trying to access a non-existing vector!");
}

const getVectorNorm = (id) => {

    (id==="" ? id=0 : id=parseInt(id));

    if(vectorList.length > id && id >= 0)
        console.log(`Vector's norm [${id}] = ${vectorList[id].norm()}`);
    else
        alert("You're trying to access a non-existing vector!");
}

const getVectorMatrixProduct = (vecId, matId) => {
    (vecId==="" ? vecId=0 : vecId=parseInt(vecId));
    (matId==="" ? matId=0 : matId=parseInt(matId));

    if(vectorList.length > vecId && matrixList.length > matId && vecId >= 0 && matId >= 0)
        console.log(vectorList[vecId].vectorMatrixProduct(matrixList[matId]).toString());
    else
        alert("You're trying to access a non-existing object!")
}

