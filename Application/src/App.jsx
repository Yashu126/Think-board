import './index.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Pages/HomePage'
import { NoteDetail } from './Pages/NoteDetail'
import { CreateNote } from './Pages/CreateNote'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/note/:id' element={<NoteDetail />} />
            <Route path='/create' element={<CreateNote/>} />
        </Routes>
    </div>
  )
}

export default App