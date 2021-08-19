// Write a program that calculates the quantity of even numbers in an randomly generated array containing ten unsigned integers
const evenQuantArray = (max_value) => {

    Number.isNaN(max_value) ? max_value=1000 : max_value=max_value; // if input parameter is empty (""), parseInt sends NaN

    if(!Number.isSafeInteger(max_value))    
        alert("ERROR: Selected number is too large!");

    else if(max_value < 0)
        alert("ERROR: Selected number < 0!");

     else {
        var randomArray = [];
        var arraySize = 10;
        var pairQuant = 0;
    
        for(i = 0; i < arraySize; i++){
            randomArray.push(Math.floor(Math.random() * max_value));
        }
    
        randomArray.forEach(number => {
            if(number%2 == 0){
                pairQuant++;
            }
        });
        
        alert(`Max value: ${max_value}\n\nRandom array: [${randomArray}]\n\nEven numbers quantity: ${pairQuant}`);
    }    
}