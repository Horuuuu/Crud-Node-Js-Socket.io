const noteForm = document.querySelector("#noteForm");/*Variable para capturar el formulario */
const title = document.querySelector("#title");/*captura el valor del  id del titulo */
const description = document.querySelector("#description");/*captura el valor del id de la descripcion */

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();/*Captura el evento Submit del formulario */

  if (savedId) {//si existe el id guardado esta actualizando
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);//sino esta creando
  }
//una vez agregada una nota vuelve a su estado inicial vacios
  title.value = "";
  description.value = "";

  title.focus();
});
