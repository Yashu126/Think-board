import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export const NoteDetail = () => {
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const saveChanges = async () => {
    setSaving(true);
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Title and Content cannot be empty");
      setSaving(false);
      return;
    }
    try {
      await axios.put(`http://localhost:5000/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  }
  useEffect(() => {
    const getNoteByID = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/notes/${id}`);
        setNote(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch note");
        console.error("Error fetching note:", error);
      }
    };
    getNoteByID();
  }, [id]);

  return (
    <div className="min-h-screen bg-base-300">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="max-w-2xl">
          <Link to="/" className="btn btn-ghost mb-4">
            <ArrowLeft className="size-4 mr-2" /> Back to Home
          </Link>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-xl">Loading note...</div>
            </div>
          ) : note ? (
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title mx-auto mb-4">Upadte Note</h2>
                <form
                  className="flex flex-col justify-center-items-center w-100"
                >
                  <div className="form-control flex-col mb-4">
                    <label className="label mb-2">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="input input-bordered rounded-full w-100"
                      value={note.title ? note.title : ''}
                      onChange={(e)=>setNote({...note, title:e.target.value})}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label mb-2">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Enter Content"
                      className="textarea textarea-bordered w-100 h-40"
                      value={note.content ? note.content : ''}
                      onChange={(e)=>setNote({...note, content:e.target.value})}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={saveChanges}
                  >
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                </form>
              </div>
            </div>
          ):
            <div className="text-center text-xl">Note not found</div>
          }
        </div>
      </div>
    </div>
  );
};
