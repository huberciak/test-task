import React from 'react';
import { useState} from 'react';
import { addCategory } from '../../api.ts'
import { useNavigate } from 'react-router-dom';

interface Option {
  value: string;
  label: string;
}

export const CategoryAdd = () => {

  const [errors, setErrors] = useState<Error[]>();
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addCategory(newCategoryName);
    navigate('/categories');
    window.location.reload();
    }

return ( 
    <>
    <div className='mx-3 w-25'>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control form-control-lg"
            onChange={(event)=> {
              setNewCategoryName(event.target.value)
            }}
          >
          </input>
        </div>
        <button type='submit' className="btn btn-primary mb-2 mt-3">
          Submit
        </button>
      </form>
    </div>
    </>
)}