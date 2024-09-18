/*
 Confusión entre la función replacer que creaste para JSON.stringify y el método replace de JavaScript. Vamos a aclarar ambos conceptos:
Función replacer en JSON.stringifyLa función replacer que has creado es una función personalizada que se pasa como segundo argumento a JSON.stringify. Esta función se utiliza para filtrar o modificar los valores antes de que se conviertan en una cadena JSON. En tu caso, la función excluye la propiedad "contraseña".
Método replace en JavaScriptEl método replace es un método nativo de JavaScript que se utiliza para reemplazar partes de una cadena de texto. Aquí tienes un ejemplo básico de cómo usarlo:

let texto = "Hola, mundo!";
let nuevoTexto = texto.replace("mundo", "JavaScript");
console.log(nuevoTexto); // "Hola, JavaScript!"

El método replace toma dos argumentos:
- Patrón a buscar: Puede ser una cadena o una expresión regular.
- Nuevo valor: La cadena que reemplazará el patrón encontrado.
Ejemplo con Expresiones RegularesPuedes usar expresiones regulares para realizar reemplazos más complejos. Por ejemplo, para reemplazar todas las ocurrencias de una palabra:

let texto = "Hola, mundo! El mundo es grande.";
let nuevoTexto = texto.replace(/mundo/g, "JavaScript");
console.log(nuevoTexto); // "Hola, JavaScript! El JavaScript es grande."

En este caso, el modificador g en la expresión regular indica que se deben reemplazar todas las ocurrencias de "mundo".
Recursos para Aprender Más- MDN Web Docs: Una referencia completa sobre el método replace.
- Línea de Código: Un artículo que explica cómo usar replace con ejemplos prácticos.







La función replacer(key, value) en tu código es una función creada por el usuario. JavaScript permite pasar una función personalizada como segundo argumento a JSON.stringify para controlar cómo se serializan los valores. En este caso, has definido una función replacer que excluye la propiedad "contraseña" al devolver undefined para esa clave específica.

Aquí tienes un ejemplo de cómo funciona:

JavaScript

const persona = {
		nombre: "Juan",
		edad: 30,
		ciudad: "Caracas",
		contraseña: "12345"
};

function replacer(key, value) {
		if (key === "contraseña") {
				return undefined;
		}
		return value;
}

const jsonString = JSON.stringify(persona, replacer, 2);
console.log(jsonString);

El resultado de console.log(jsonString) será:

JSON

{
	"nombre": "Juan",
	"edad": 30,
	"ciudad": "Caracas"
}
 la propiedad "contraseña" ha sido excluida del resultado JSON.
*/ 



(() => {
	// Selección del elemento con id "fecth" y se almacena en $fecth
	const $fecthAsync = document.getElementById("fecth_async");

	const $fragment = document.createDocumentFragment();

	async function getDatos() {
		try {
			console.log("Dentro del Try");
			// Abrimos la solicitud GET y establecemos la URL
			//let $response = await fetch("https://jsonplaceholder.typicode.com/users");

			//  Abrimos la solicitud GET en el archivo local 
			// Se utilizo la declaracion var  y no let ,para que sea visibel en el catch()
			var $response = await fetch("/assets/users.json");
			let $json = await $response.json();
			console.log("$response =", $response);
			console.log("$json =", $json);
			// Para ver el contenido del JSON de forma legible

			console.log("Contenido del JSON:", JSON.stringify($json, null, 2));

			$json.forEach((element) => {
				const $li = document.createElement("li");
				const nombreTexto = `Nombre del Usuario : ${element.name}`;
				const correoTexto = `Correo electronico: ${element.email}`;
				const telefonoTexto = `Número Telefonico : ${element.phone}`

				console.log(nombreTexto);
				console.log(correoTexto);
				console.log(telefonoTexto);
				console.log(" ");

				$li.innerHTML = `${nombreTexto} || ${correoTexto} || ${telefonoTexto}`;
				$fragment.appendChild($li);
			});
			$fecthAsync.appendChild($fragment);
		} 
		catch (error) {
			console.log("Dentro del Catch ");
			console.error("Hubo un problema con la petición Fetch:", error);
			let statusMensaje = $response.status;
			let textMensaje = $response.statusText;
			$fecthAsync.innerHTML = ` ERROR: ${statusMensaje} ${textMensaje}`;

			throw {
				status: statusMensaje, statusText: textMensaje
			}
		} finally {
			// Código que se ejecuta siempre, independientemente de si hubo un error o no
		}
	}
	getDatos();
})();

