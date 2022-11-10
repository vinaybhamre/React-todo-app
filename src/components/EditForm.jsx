
import { useEffect, useState } from 'react';


// library imports
import { CheckIcon } from '@heroicons/react/24/outline';

function EditForm({ editedTask, updateTask, closeEditMode } ) {

    const [updatedTaskName, setUpdatedTaskName ] = useState(editedTask.name);

    useEffect(()=> {

      const closeModalIfEsaped = (e) => {
        e.key === "Escape" && closeEditMode();
      }

      window.addEventListener('keydown', closeModalIfEsaped)

      return ()=> {
        window.removeEventListener('keydown', closeModalIfEsaped)
      }

    },[closeEditMode])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editedTask, name : updatedTaskName})

    }

  return (
    <div 
    role="dialog" aria-labelledby="edittask"
    onClick={(e)=> (e.target === e.currentTarget && closeEditMode())}
    >
      <form
      className="todo"
      onSubmit={handleFormSubmit}
      >
          <div className="wrapper">
          <input
          type="text"
          id="editTask"
          className="input"
          value={updatedTaskName}
          onInput={(e)=> setUpdatedTaskName(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Update Task"
          />
          <label
          htmlFor="editTask"
          className="label"
          >Update Task</label>
          </div>
          <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type="submit"
          >
             <CheckIcon strokeWidth={2} height={24} width={24} />
          </button>
      </form>
    </div>
  )
}

export default EditForm