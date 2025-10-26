import axios from "axios";
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"


export const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent navigation
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try{
            await axios.delete(`http://localhost:5000/notes/${id}`);
            toast.success("Note deleted successfully");
            setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
        }catch(error){
            if(error.response.status === 429){
                toast.error("Too many requests. Please try again later.", 
                    {
                        duration: 4000,
                        icon: '💀',
                    }
                );
            } else {
                console.error("Error deleting note:", error);
                toast.error("Failed to delete note");
            }
        }
    }
  return (
    <Link to={`note/:${note._id}`} className="card  bg-gray-500 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]">    
        <div className="card-body">
            <h2 className="card-title text-lg font-bold">{note.title}</h2>
            <p className="text-sm">{note.content}</p>
            <div className="card-action flex justify-between items-center mt-4">
                <span className="text-sm">{new Date(note.updatedAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                    <button className="btn btn-ghost btn-xs">
                        <PenSquareIcon className="size-4" />
                    </button>
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}
