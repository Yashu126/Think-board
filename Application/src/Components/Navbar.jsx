import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

export const Navbar = () => {
  return (
    <header className="w-full bg-gray-600 text-white p-4">
        <div className='mx-auto max-w-7xl flex items-center justify-between'>
            <h1 className="text-2xl font-bold">My Notes App</h1>
            <div className='flex items-center gap-4'>
                <Link to='/Create' className="btn btn-primary rounded-full"><PlusIcon />Create</Link>
            </div>
        </div>
    </header>
  )
}
