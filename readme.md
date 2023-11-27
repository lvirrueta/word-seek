## Word Seek

#### Descripción
<p>
Este proyecto consiste en el algoritmo para encontrar la solución de una sopa de letras, encuentra la solución en cualquier dirección. 
<br>
Para encontrar la solución, se tiene que mandar un arreglo de las letras que se quieren encontrar. Y la sopa de letras en un arreglo de dos dimensiones.
</p>

<br>
<p>
enviar por petición POST a la url 'localhost:3000' el siguiente body: 
</p>
```
{
  "words2find": ["LEOPARDO", "LEON", "ELEFANTE", "RATON"],
  "wordSearch": [
    ["L", "A", "B", "W", "C", "X", "D", "R"],
    ["E", "E", "C", "T", "V", "B", "A", "L"],
    ["F", "L", "O", "N", "C", "F", "E", "E"],
    ["G", "E", "O", "P", "A", "R", "D", "O"],
    ["R", "F", "M", "N", "A", "N", "G", "N"],
    ["T", "A", "O", "T", "T", "R", "I", "A"],
    ["U", "N", "W", "E", "Z", "I", "D", "D"],
    ["Z", "T", "A", "I", "U", "T", "G", "O"],
    ["W", "E", "X", "M", "J", "M", "V", "S"]
  ]
}
```