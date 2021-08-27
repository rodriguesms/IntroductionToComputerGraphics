// Write a program that calculates the quantity of even numbers in an randomly generated array containing ten unsigned integers
const evenQuantArray = (max_value) => {

    Number.isNaN(max_value) ? max_value=1000 : max_value=max_value; 
    // if input parameter is empty (""), parseInt at html, sends NaN

    if(!Number.isSafeInteger(max_value)) // Check if is a integer < than the greater safe integer in Javascript
        alert("ERROR: Selected number is too large!");

    else if(max_value < 0) // Check if it is positive
        alert("ERROR: Selected number < 0!");

     else {
        var randomArray = []; // empty array
        var arraySize = 10; // size of array
        var pairQuant = 0; // number of even numbers
    
        for(i = 0; i < arraySize; i++){ // fill the array with randomly generated numbers between [0, max_value)
            randomArray.push(Math.floor(Math.random() * max_value));
        }
    
        randomArray.forEach(number => { // for each array number, check if it is pair, then let pairQuant know
            if(number%2 == 0){
                pairQuant++;
            }
        });
        
        //The result should be displayed at the browser, in an alert.
        alert(`Max value: ${max_value}\n\nRandom array: [${randomArray}]\n\nEven numbers quantity: ${pairQuant}`);
    }    
}