// Función anónima autoejecutable
(() => {
  // Selección del elemento con id "fecth" y se almacena en $fecth
  const $fecth = document.getElementById("fecth");

  // Creación de un fragmento de documento
  const $fragment = document.createDocumentFragment();

  // // Realizamos la solicitud  la  API GET utilizando fetch
  // Realizamos la solicitud  Local GET utilizando fetch 
   fetch("https://jsonplaceholder.typicode.com/users")
 // fetch("/assets/users.json")
    
    /* 
      // ? Opcion con enfoque mas conciso pero menos  claro
      .then(($response) => $response.ok ? $response.json() : Promise.reject($response))
      */
    .then(($response) => {
      console.log($response);
      // Verificamos si la solicitud fue exitosa
      if ($response.ok) {
        console.log("Status 2xx: consulta exitosa");

        // Transformamos la respuesta en un objeto JavaScript
        return $response.json();
        //? return $response.text();
        //? return $response.blob();S i
      } else {
        console.log(`ERROR Status ${$response.status}: consulta fallida`);
        throw new Error(`Error ${$response.status}: ${$response.statusText}`);
      }
    })
    .then(($json) => {
      //? .then(($text) => {
      //?.then(($blob) => {


      console.log($json);
      //?console.log($text);
      //?console.log($blob);

      $fecth.innerHTML = $json;
      //? $fecth.innerHTML = $text;
      //?$fecth.innerHTML = $blob;


      //Recorremos el arreglo de objetos y creamos elementos li
      $json.forEach((element) => {
        const $li = document.createElement("li");
        const nombreTexto = `Nombre del Usuario: ${element.name}`;
        const correoTexto = `Correo Electrónico: ${element.email}`;
        const telefonoTexto = `Número Telefónico: ${element.phone}`;

        console.log(nombreTexto);
        console.log(correoTexto);
        console.log(telefonoTexto);
        console.log(" ");

        $li.innerHTML = `${nombreTexto} || ${correoTexto} ||  ${telefonoTexto}`;
        $fragment.appendChild($li);
      });
      //? Agregamos el fragmento de documento al elemento con id "fecth"
      $fecth.appendChild($fragment);
    })
    .catch((error) => {
      console.error("Erro: Hubo un problema con la petición Fetch " + error);
    });
})();
