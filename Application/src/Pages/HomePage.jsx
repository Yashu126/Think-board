import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import axios from "axios";
import { NoteCard } from "../Components/NoteCard";
import { NotesNotFound } from "../Components/NotesNotFound";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes");
        setNotes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="h-screen">
      <Navbar />

      {notes.length === 0 && <NotesNotFound />}

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-xl">Loading notes...</div>
        </div>
      ) : (
        <div className="">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
};
