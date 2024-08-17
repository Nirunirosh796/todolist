import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {useRef} from 'react'
const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef=useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlfor="addItem">Add Item</label>
        <input 
            type='text'
            ref={inputRef}
            autoFocus
            placeholder='AddItem'
            id='AddItem'
            required
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
        ></input>
        <button 
            type='submit'
            aria-label='Add-item'
            onClick={() =>inputRef.current.focus()}
        ><FaPlus/>
        </button>
    </form>
  )
}

export default AddItem