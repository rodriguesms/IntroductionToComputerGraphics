const prepareArrayThenGo = (stringArray) => {

    stringArray.split(","); // Spliting the string using the ',' as a separator

    const newArray = []; // new array that is going to store the integer values
    
    JSON.parse(`[${stringArray}]`).forEach(element => { // JSON.parse will transform the stringArray into a array of string numbers
        newArray.push(parseInt(element)); //then, for each string number, parseInt will transform it into a integer and then push into the newArray
    });
    quickSort(newArray, 0, newArray.length-1); // Then, with a preprocessed array, i can now invoke the quicksort function
    alert(`Sorted array: [${newArray}]`); // after sorting the array, alert the result into browser
}


const quickSort = (array, beginning, end) => { // The array that should be reorganized, his first and last value are the 
    if(beginning < end){
        let pivot = partition(array, beginning, end);
        quickSort(array, beginning, pivot-1);
        quickSort(array, pivot+1, end)
    }
}

const partition = (array, beginning, end) => {

    let aux = beginning - 1;

    for(var i = beginning; i <= end-1; i++){
        if(array[i] <= array[end]){
            aux = aux + 1;
            swap(array, aux, i);
        }
    }
    swap(array, aux+1, end);
    return aux + 1;
}


// change 
const swap = (array, i, j) => { 
    var aux = array[i];
    array[i] = array[j];
    array[j] = aux;
}