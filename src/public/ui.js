const notesList = document.querySelector("#notes");//captura lista de notas

let savedId = "";
//lo que se va a pintar cada vez que se agregue una nota
const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInDownBig mb-2">
      <div class="d-flex justify-content-between">     
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">Borrar</button>
              <button class="btn btn-warning update" data-id="${note.id}">Editar</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");//captura el boton y clase delete
  const btnUpdate = div.querySelector(".update");//captura la clase y boton uptdate

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));//para tener el id de cada boton delete

  btnUpdate.addEventListener("click", () => {
    socket.emit("client:getnote", btnUpdate.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {//renderiza multiples notas desde el recorrido
  savedId = "";
  notesList.innerHTML = "";//para que al borrar no se agreguen ,se  vacia la lista de notas cuando se carga denuevo
  console.log(notes);
  notes.forEach((note) => {//para listar las notas ,por cada nota del arreglo genera una nota(noteUI)
    notesList.append(noteUI(note));
  });
};

const appendNote = (note) => {
  notesList.append(noteUI(note));//desde la lista de notas ,añade una nueva nota
};
