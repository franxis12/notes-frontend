import { useEffect, useState } from "react";
import { getNotes, createNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Cargar notas al inicio
  useEffect(() => {
    getNotes().then((res) => setNotes(res.data));
  }, []);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    const res = await createNote(newNote);
    setNotes([res.data, ...notes]); // agrega la nueva nota arriba
    setNewNote(""); // limpia el input
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>Notas</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nota"
        />
        <button onClick={handleAddNote}>Agregar</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text} —{" "}
            <small>{new Date(note.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
