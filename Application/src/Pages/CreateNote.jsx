import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

export const CreateNote = () => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [Loading, setLoading] = React.useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!title || !content) return toast.error('Please fill all the fields')
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/notes', {title, content})
      toast.success('Note created successfully')
      setTitle('')
      setContent('')
      setLoading(false)
    }
    catch (error) {
      console.error('Error creating note:', error)
      toast.error('Failed to create note')
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-300'>
      <div className='container mx-auto p-4 flex flex-col items-center'>
        <div className='max-w-2xl'> 
          <Link to='/' className='btn btn-ghost mb-4'>
            <ArrowLeft className='size-4 mr-2' /> Back
            Back to Home
          </Link>
          <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <h2 className='card-title mx-auto mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit} className='flex flex-col justify-center-items-center w-100'>
                <div className='form-control flex-col mb-4'>
                  <label className='label mb-2'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' placeholder='Enter Title' className='input input-bordered rounded-full w-100' onChange={(e)=>setTitle(e.target.value)} value={title} />
                </div>
                <div className='form-control mb-4'>
                  <label className='label mb-2'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Enter Content' className='textarea textarea-bordered w-100 h-40' onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
                </div>
                <button type='submit' className='btn btn-primary' disabled={Loading}>
                  {Loading ? 'Creating...' : 'Create Note'}
                </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
