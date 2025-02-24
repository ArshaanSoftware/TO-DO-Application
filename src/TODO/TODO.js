import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

function TODO() {
  const [todoList, setTodoList] = useState([])
  const inputRef = useRef()

  // Load the todo list from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todoList'))
    if (savedTodos) {
      setTodoList(savedTodos)
    }
  }, [])

  // Store the todo list in localStorage whenever it changes
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }
  }, [todoList])

  const add = () => { 
    const inputText = inputRef.current.value.trim()

    if(inputText === '') {
      return null
    }
    
    console.log(inputText)

    const newTodo = {
      id: Date.now(), // Corrected to use Date.now()
      text: inputText,
      isComplete: false,
    }

    // Corrected state update
    setTodoList((prev) => [...prev, newTodo])

    // Clear the input field
    inputRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }
        }
        return todo
      })
    })
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center gap-2 mt-7'>
        <img src={todo_icon} alt="" className='w-8'/>
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>
      
      <div className='flex items-center bg-gray-200 rounded-full my-7'>
        <input 
          ref={inputRef} 
          type='text' 
          placeholder='Add your task' 
          className='flex-1 px-4 py-1 pl-6 pr-2 bg-transparent border-0 outline-none h-14 placeholder:text-slate-600'
        />
        <button 
          onClick={add} 
          className='w-32 text-lg font-medium text-white bg-orange-500 border-none rounded-full cursor-pointer h-14'>
          ADD +
        </button>
      </div>

      <div className=''>
        {todoList.map((item) => (
          <TodoItems 
            key={item.id} 
            text={item.text} 
            id={item.id} 
            isComplete={item.isComplete} 
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  )
}

export default TODO
