import React from 'react';
import { useMatch, useNavigate  } from 'react-router-dom';
import { useState, useEffect,} from 'react';
import { getCategory, editCategory } from '../../api.ts'
import { Category } from '../../react-app-env';

export const CategoryEdit = () => {

  const match = useMatch('/categories/:categoryId');
  const selectedCategoryId = match?.params.categoryId;

  console.log(selectedCategoryId);

  const [category, setCategory] = useState<Category>();
  const [errors, setErrors] = useState();
  const [newCategoryName, setNewCategoryName] = useState<string>();

  useEffect(() => {
    if(selectedCategoryId){
      getCategory(+selectedCategoryId)
      .then((data: { data: React.SetStateAction<Category | undefined>; }) => {
      console.log(data);
      setCategory(data.data)})
      .catch((error: React.SetStateAction<undefined>) => setErrors(error));
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if(selectedCategoryId) {
      setNewCategoryName(category?.name);
    }
  },[category?.name, selectedCategoryId]);

  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editCategory(category?.id, newCategoryName);
    navigate('/categories');
    window.location.reload();
    }

  return ( 
    selectedCategoryId && (
      <>
      <div className='mx-3 w-25'>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
          <label>Category: </label>
          <input
            type="text"
            value={newCategoryName}
            className="form-control form-control-lg"
            onChange={(event)=> {
              setNewCategoryName(event.target.value)
            }}
          >
          </input>
          </div>
          <button type="submit" className="btn btn-primary mb-2 mt-3">
            Submit
          </button>
        </form>
      </div>
      </>
    )
  )
}