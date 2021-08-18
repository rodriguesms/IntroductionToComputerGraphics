// Write a program that calculates the quantity of even numbers in an randomly generated array containing ten unsigned integers
const evenQuantArray = (max_value=1000) => {
    var randomArray = [];
    var arraySize = 10;
    var pairQuant = 0;

    for(i = 0; i < arraySize; i++){
        randomArray.push(Math.floor(Math.random() * max_value)); // Generates random integer number between 0 and max_value
    }

    randomArray.forEach(number => {
        if(number%2 == 0){ // if is it pair
            pairQuant++;
        }
    });

    return pairQuant;
}