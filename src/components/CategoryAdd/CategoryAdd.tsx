import React from 'react';
import { useState} from 'react';
import { addCategory } from '../../api.ts'

interface Option {
  value: string;
  label: string;
}

let options: Option[] = [];

export const CategoryAdd = () => {

  const [errors, setErrors] = useState<Error[]>();
  const [newCategoryName, setNewCategoryName] = useState<string>("");


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addCategory(newCategoryName);
    }

return ( 
    <>
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            onChange={(event)=> {
              setNewCategoryName(event.target.value)
            }}
          >
          </input>
            {newCategoryName}
        </div>
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
    </>
)}