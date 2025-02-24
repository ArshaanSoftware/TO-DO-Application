import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_tick from '../assets/delete.png'

function TodoItems({ text, id, isComplete, deleteTodo , toggle}) {
  return (
    <div  onClick={()=>{toggle(id)}} className='flex items-center gap-2 my-3'>
      <div className='flex items-center flex-1 cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt='img' className='w-7' />
              <p className={`ml-4 text-slate-700 text-[17px]
                 ${isComplete ? 'line-through' : ''}`}>
          {text}
        </p>
      </div>
      
      <img 
        src={delete_tick} 
        alt='delete' 
        className='w-3.5 cursor-pointer'
        onClick={() => deleteTodo(id)} // Delete the todo on click
      />
    </div>
  )
}

export default TodoItems
