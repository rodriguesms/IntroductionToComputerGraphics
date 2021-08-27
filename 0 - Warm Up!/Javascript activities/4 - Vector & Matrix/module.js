class Vector {

    constructor(i1=0, i2=0, i3=0){
        this.i1 = i1;
        this.i2 = i2;
        this.i3 = i3;
    }

    /*Shows a new Vector in the browser*/
    displayVector(){
        alert(`Created Vector:\n[ ${this.i1}, ${this.i2}, ${this.i3} ]`);
    }

    /*Transform a vector and it's information on a string to be displayed at console in the index.js level*/
    toString(id){
        (id==undefined ? id="result" : null); // if id was not passed, means it doesn't belong to the saved vectors (it is a result of operation)

        return(`Vector ${id}: [ ${this.i1}, ${this.i2}, ${this.i3} ]`);
    }

    norm(){
        return Math.sqrt(
            Math.pow(this.i1, 2) +
            Math.pow(this .i2, 2) +
            Math.pow(this.i3, 2)
        )
    }

    crossProduct(vector2){
        return new Vector(
            (this.i2*vector2.i3)-(this.i3*vector2.i2),
            (this.i3*vector2.i1)-(this.i1*vector2.i3),
            (this.i1*vector2.i2)-(this.i2*vector2.i1)           
        );
    }

    dotProduct(vector2){
        return(
            (this.i1*vector2.i1) +
            (this.i2*vector2.i2) +
            (this.i3*vector2.i3)
        );
    }

    vectorMatrixProduct(matrix){
        return new Vector(
            ((matrix.j1.i1*this.i1)+(matrix.j1.i2*this.i2)+(matrix.j1.i3*this.i3)),
            ((matrix.j2.i1*this.i1)+(matrix.j2.i2*this.i2)+(matrix.j2.i3*this.i3)),
            ((matrix.j3.i1*this.i1)+(matrix.j3.i2*this.i2)+(matrix.j3.i3*this.i3))
        );
    }
}


class Matrix {
    //each one of these is a vector that represents a matrix column
    //if any is empty, it fills as a 0 vector 
    constructor(j1=new Vector(0, 0, 0), 
                j2=new Vector(0, 0, 0), 
                j3=new Vector(0, 0, 0)){ 
        this.j1 = j1;
        this.j2 = j2;
        this.j3 = j3;

        this.line1 = new Vector(this.j1.i1, this.j2.i1, this.j3.i1) //attribute line if you want to have access to a specific column
        this.line2 = new Vector(this.j1.i2, this.j2.i2, this.j3.i2)
        this.line3 = new Vector(this.j1.i3, this.j2.i3, this.j3.i3)
    }

    

    displayMatrix(){
              alert(`Created Matrix:\n| ${this.j1.i1}, ${this.j2.i1}, ${this.j3.i1} |\n| ${this.j1.i2}, ${this.j2.i2}, ${this.j3.i2} |\n| ${this.j1.i3}, ${this.j2.i3}, ${this.j3.i3} |`);        
    }

    toString(id){
        
       (id==undefined ? id="result" : null); // if id was not passed, means it doesn't belong to the saved matrices (it is a result of operation)

        return(`Matrix ${id}:\n`+
        `|${this.j1.i1} ${this.j2.i1} ${this.j3.i1}|\n`+
        `|${this.j1.i2} ${this.j2.i2} ${this.j3.i2}|\n`+
        `|${this.j1.i3} ${this.j2.i3} ${this.j3.i3}|`);
    }

    productBetweenMatrices(matrix2){
            return new Matrix(
                new Vector(
                    ((this.j1.i1*matrix2.j1.i1)+(this.j2.i1*matrix2.j1.i2)+(this.j3.i1*matrix2.j1.i3)),
                    ((this.j1.i2*matrix2.j1.i1)+(this.j2.i2*matrix2.j1.i2)+(this.j3.i2*matrix2.j1.i3)),
                    ((this.j1.i3*matrix2.j1.i1)+(this.j2.i3*matrix2.j1.i2)+(this.j3.i3*matrix2.j1.i3))
                ),
                new Vector(
                    ((this.j1.i1*matrix2.j2.i1)+(this.j2.i1*matrix2.j2.i2)+(this.j3.i1*matrix2.j2.i3)),
                    ((this.j1.i2*matrix2.j2.i1)+(this.j2.i2*matrix2.j2.i2)+(this.j3.i2*matrix2.j2.i3)),
                    ((this.j1.i3*matrix2.j2.i1)+(this.j2.i3*matrix2.j2.i2)+(this.j3.i3*matrix2.j2.i3))
                ),
                new Vector(
                    ((this.j1.i1*matrix2.j3.i1)+(this.j2.i1*matrix2.j3.i2)+(this.j3.i1*matrix2.j3.i3)),
                    ((this.j1.i2*matrix2.j3.i1)+(this.j2.i2*matrix2.j3.i2)+(this.j3.i2*matrix2.j3.i3)),
                    ((this.j1.i3*matrix2.j3.i1)+(this.j2.i3*matrix2.j3.i2)+(this.j3.i3*matrix2.j3.i3))
                )
            )
    }

    matrixDeterminant(){
        return (
            (this.j1.i1*this.j2.i2*this.j3.i3) +
            (this.j2.i1*this.j3.i2*this.j1.i3) +
            (this.j3.i1*this.j1.i2*this.j2.i3) -
            (this.j2.i1*this.j1.i2*this.j3.i3) -
            (this.j1.i1*this.j3.i2*this.j2.i3) -
            (this.j3.i1*this.j2.i2*this.j1.i3)
        );
    }

    matrixTransposal(){
        return new Matrix(
            new Vector(
                this.j1.i1,
                this.j2.i1,
                this.j3.i1
            ),
            new Vector(
                this.j1.i2,
                this.j2.i2,
                this.j3.i2
            ),
            new Vector(
                this.j1.i3,
                this.j2.i3,
                this.j3.i3
            )
        )
    }

}