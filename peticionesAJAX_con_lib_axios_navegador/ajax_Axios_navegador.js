
(() => {

	//? Obtener el elemento del DOM
	const $axios = document.getElementById("axios_async");
	//const $axios = document.getElementById("axios_async");

	// Crear un fragmento de documento
	const $fragment = document.createDocumentFragment();
	console.log($fragment);
	// Hacer la solicitud GET utilizando Axios
	axios
		.get("https://jsonplaceholder.typicode.com/user")
		//.get("/assets/users.json")
		.then((response) => {
			let $json = response.data;

			console.log(response);
			// Manejar la respuesta exitosa
			//console.log(response.data);
			$json.forEach((element) => {
				const $li = document.createElement("li");
				const nombreTexto = `Nombre del usuario: ${element.name}`;
				const correoTexto = `Correo electronico : ${element.email}`;
				const telefonoTexto = `Número Telefonnico : ${element.phone}`;

				console.log(nombreTexto);
				console.log(correoTexto);
				console.log(telefonoTexto);
				console.log(" ");



				$li.innerHTML = `${nombreTexto} || ${correoTexto} || ${telefonoTexto}`;
				$fragment.appendChild($li);

			});
			$axios.appendChild($fragment);


		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response);
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers)

			} else if (error.request) {
				console.log('ERROR', error.message);


			} // Manejar el error
			console.log("Dentro del Catch ");
			console.error("Hubo un problema con la petición Fetch:", error);
			let statusMensaje = error.response.status;
			let textMensaje = error.response.statusText;

			$axios.innerHTML = ` ERROR: ${statusMensaje} ${textMensaje}`;


			throw {
				 Su_status: statusMensaje, El_statusText: textMensaje
			}
		})
		.finally(() => {
			// Código que se ejecuta independientemente del resultado
			console.log("Solicitud finalizada");

		});
})();

