const socket = io.connect();

/**
 * guarda una nueva nota
 * @param {string} title titulo para una nueva nota
 * @param {string} description descripcion para una nueva nota
 */
//para guardar una nueva nota
const saveNote = (title, description) => {
  /*cliente emite evento de una nueva nota  */
  socket.emit("client:newnote", {
    title,
    description,
  });
};

/**
 * elimina nota basada en el id
 * @param {string} id a note ID
 */
const deleteNote = (id) => {//emite un evento desde el cliente y le envia como dato el id
  socket.emit("client:deletenote", id);
};

/**
 * 
 * @param {string} id nota ID
 * @param {string} title nota titulo 
 * @param {string} description nota descripcion
 */
const updateNote= (id, title, description) => {
  socket.emit("client:updatenote", {
    id,
    title,
    description,
  });
};

socket.on("server:loadnotes", renderNotes);//cuando se esta recibiendo una lista de notas

socket.on("server:newnote", appendNote);//se llama cuando se crea una nueva nota

socket.on("server:selectednote", (note) => {//toma el titulo y la descripcion de la nota seleccionada
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.value = note.title;
  description.value = note.description;

  savedId = note.id;
});
