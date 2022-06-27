'use strict';

function calcAge(birthYear) {
    const age = 2022 - birthYear;

    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}.`
        console.log(output);
    

        if (birthYear >= 1981 && birthYear <= 1996) {
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            function add(a, b) {
                return a + b
            }
        }
    }
    printAge();

    return age;
}

const firstName = 'Arkadii';
calcAge(1996);