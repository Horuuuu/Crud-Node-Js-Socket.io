import { v4 as uuid } from "uuid";

let notes = [];

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    // Envia todos los mensajes al cliente
    socket.emit("server:loadnotes", notes);
//recibe del cliente el valor de una nueva nota
    socket.on("client:newnote", (newNote) => {
      //se guarda la nota recibida en un objeto y le agrega un id
      const note = { ...newNote, id: uuid() };
      notes.push(note);
      //evento que devuelve la nota al cliente con un id
      io.emit("server:newnote", note);
    });
    //emite un evento desde el cliente
    socket.on("client:deletenote", (noteId) => {//envia la nota al servidor y éste no le responde
      console.log(noteId);
      notes = notes.filter((note) => note.id !== noteId);//quita la nota que coincida y la guarda en el arreglo notes
      io.emit("server:loadnotes", notes);//emite denuevo el evento porque se actualizan las notas
    });

    socket.on("client:getnote", (noteId) => {//cuando reciba id emite evento desde el cliente
      const note = notes.find((note) => note.id === noteId);//busca las notas y compara los id
      socket.emit("server:selectednote", note);//emite evento de la nota seleccionada
    });

    socket.on("client:updatenote", (updatedNote) => {//evento desde el  cliente que envia id ,titulo y descripcion
      notes = notes.map((note) => {//recorre uno a uno y te devuelve un arreglo nuevo
        if (note.id === updatedNote.id) {//si la nota que esta recorriendo su id es igual al id de  la nota actualizada
          note.title = updatedNote.title;//actualiza el titulo con el titulo de la nota actualizado
          note.description = updatedNote.description;//y tambien para la descripcion
        }
        return note;
      });
      io.emit("server:loadnotes", notes);//carga arreglo nuevo con las notas actualizadas
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
