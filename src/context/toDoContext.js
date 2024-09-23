import { useContext } from "react";
import { createContext } from "react";

const ToDoContext = createContext({
    toDos: [
        {
            id: 1,
            title: "Learn React",
            completed: false
        }
    ],
    addToDo: (title) => {},
    deleteToDo: (id) => {},
    updateToDo: (id,title) => {},
    toggleCompleted: (id) => {},
});

export const ToDoProvider = ToDoContext.Provider;

export const useToDo = () => { 
    return useContext(ToDoContext)
}


