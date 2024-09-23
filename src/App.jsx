import { useState, useEffect } from 'react'
import { ToDoCard, ToDoForm } from './components'
import { ToDoProvider } from './context'


export default function App() {
    const [toDos, setToDos] = useState([])

    const addToDo = async (title) => {
        setToDos((prevToDos) => [
            ...prevToDos,
            {
                id: Date.now(),
                title: title,
                completed: false
            }
        ],
        )
    }

    const deleteToDo = (id) => {
        setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id))
    }

    const updateToDo = (id, title) => {
        setToDos((prevToDos) => {
            return prevToDos.map((todo) => 
                todo.id === id ? { ...todo, title: title } : todo
            )
        })
    }

    const toggleCompleted = (id) => {
        setToDos((prevToDos) => {
             return prevToDos.map((todo) => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )})
    }

    useEffect(() => {
        const toDos = JSON.parse(localStorage.getItem("toDos"));
        if (toDos && toDos.length > 0) {
            setToDos(toDos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos));
    }, [toDos]);



    return (
        <ToDoProvider value={{ toDos, addToDo, deleteToDo, toggleCompleted, updateToDo }} >
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <ToDoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {toDos.length > 0 ? (toDos.map((todo) => (
                            <div key={todo?.id} className='p-1 mb-1 w-full'>
                                <ToDoCard
                                    todo={todo}
                                />
                            </div>))) : (

                            <p className="text-center text-white">No todos</p>
                        )}
                    </div>
                </div>
            </div>
        </ToDoProvider>
    )
}