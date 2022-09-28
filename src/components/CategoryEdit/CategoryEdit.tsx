import React from 'react';
import { useMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editCategory(category?.id, newCategoryName);
    }

  return ( 
    selectedCategoryId && (
      <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
          <label>Category: </label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(event)=> {
              setNewCategoryName(event.target.value)
            }}
          >
          </input>
          {newCategoryName}
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
      </>
    )
  )
}