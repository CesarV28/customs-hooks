import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


const init = () => {
    return JSON.parse(localStorage.getItem('TODOS_RR01')) || [];
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, [], init);

    useEffect(() => {
      localStorage.setItem('TODOS_RR01', JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        
        const action = {
            type: '[TODO]: Add',
            payload: todo,
        }

        dispatch( action );
    }

    const handleRemoveTodo = ( id ) => {
        dispatch({
            type: '[TODO]: Remove',
            payload: id,
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO]: Complete',
            payload: id,
        });
    }

    const todosCount = () => todos.length


    const pendingTodosCount = () => todos.filter(todo => !todo.done).length
    

    return {
        todos,
        handleNewTodo, 
        handleRemoveTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,
    }
}
