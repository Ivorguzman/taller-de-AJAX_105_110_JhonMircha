// Función anónima autoejecutable
(() => {

  // Selección del elemento con id "xhr"
  const $xhr = document.getElementById("xhr");

  // Creación de un fragmento de documento
  const $fragment = document.createDocumentFragment();

  // Instancia del XMLHttpRequest()
  const objXhr = new XMLHttpRequest();

  // Abrimos la solicitud GET y establecemos la URL
  // xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  //  Abrimos la solicitud GET en el archivo local 
  objXhr.open("GET", "/assets/users.json");

  // Agregamos un evento de escucha para el estado de la solicitud
  objXhr.addEventListener("readystatechange", (e) => {
    // Si el estado no es 4 (completado), salimos de la función
    if (objXhr.readyState !== 4) return;

    // Verificamos si el estado es exitoso (200-299)
    if (objXhr.status >= 200 && objXhr.status < 300) {
      console.log(objXhr);
      let message = objXhr.statusText;
      $xhr.innerHTML = `Status de la solicitud = ${objXhr.status} :  ${message}`

      // Transformamos la respuesta AJAX en texto legible ( de JSOAn a OBJETO JavaScript)
      let $json = JSON.parse(objXhr.responseText);
      console.log($json);

      // Recorremos el arreglo de objetos y creamos 
      $json.forEach((elemento) => {
        let $li = document.createElement("li");
        let $br = document.createElement("br");
        let nombreTexto = `Nombre del Usuario: ${elemento.name}`;
        let correoTexto = `Correo Electrónico: ${elemento.email}`;
        let telefonoTexto = `Número Telefónico: ${elemento.phone}`;
        let espacio = "<br>";

        $li.innerHTML = `${nombreTexto} || ${correoTexto} ||  ${telefonoTexto}`;
        $br.innerHTML = `${espacio}`;


        $fragment.appendChild($li);
        $fragment.appendChild($br);

      });

      // Agregamos el fragmento de documento al elemento con id "xhr"
      $xhr.appendChild($fragment);
    } else {
      let message = objXhr.statusText;
      console.log(message);
      console.log(objXhr);
      $xhr.innerHTML = `Status :${objXhr.status}:  ${message}`
    }
  });

  // Enviamos la solicitud
  objXhr.send();
})();
