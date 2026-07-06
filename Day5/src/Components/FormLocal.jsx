import { useState, useEffect } from "react";

function FormLocal() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("myNotes");

    if (data) {
      setNotes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  function handleAdd() {
    if (note === "") return;

    setNotes([...notes, note]);
    setNote("");
  }

  return (
    <div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note"
      />

      <button onClick={handleAdd}>Save</button>

      <ul>
        {notes.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FormLocal;