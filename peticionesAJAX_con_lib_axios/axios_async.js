import axios from 'axios';
import jsdom from 'jsdom';

const { window } = new jsdom.JSDOM();
const document = window.document;
(() => {
	
	//? Obtener el elemento del DOM
	const $axios = document.getElementById("axios_async");
	//const $axios = document.getElementById("axios_async");

	// Crear un fragmento de documento
	const $fragment = document.createDocumentFragment();
	console.log($fragment);
	// Hacer la solicitud GET utilizando Axios
	axios
		.get("https://jsonplaceholder.typicode.com/users")
		//.get("/assets/users.json")
			.then((response) => {
				console.log(response);
			// Manejar la respuesta exitosa
			console.log(response.data);
		})
		.catch((error) => {
			// Manejar el error
			console.log("Dentro del Catch ");
			console.error("Hubo un problema con la petición Fetch:", error);
			let statusMensaje = error.response.status;;
			let textMensaje = error.response.statusText;
			$axios.innerHTML = ` ERROR: ${statusMensaje} ${textMensaje}`;

			throw {
				status: statusMensaje, statusText: textMensaje
			}
		})
		.finally(() => {
			// Código que se ejecuta independientemente del resultado
			console.log("Solicitud finalizada");
			
		});
})();

