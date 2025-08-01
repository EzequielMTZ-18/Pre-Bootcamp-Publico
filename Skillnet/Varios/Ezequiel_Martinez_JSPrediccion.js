function miEdad() {

   console.log("Tengo: " + 25 + " años");

}
//Imprime en consola "Tengo: 25 años"


function miEdad(edad) {

   console.log("Tengo: " + edad + " años");

}
//Imprime en consola el valor "edad" recibido como parametro. "Tengo: (parametro) años"


function restar(primerNumero, segundoNumero) {

   console.log("¡Restemos los números!"); //Imprime el texto indicado en los parentesis.

   console.log("primerNumero es:" + primerNumero); //Imprime el texto indicado + el primer parametro recibido

   console.log("segundoNumero es:" + segundoNumero);//Imprime el texto indicado + el segundo parametro recibido

   var resultado = primerNumero - segundoNumero; // Resta el primer parametro con el segundo parametro

   console.log(resultado); //Imprime el resultado de la resta entre parametros

}
