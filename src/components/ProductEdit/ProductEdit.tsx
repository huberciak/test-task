import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getProduct, getCategory, getCategoriesList, editProduct } from '../../api.ts'
import { Category, Product } from '../../react-app-env';
import Select from 'react-select'
interface Option {
  value: string;
  label: string;
}


let options: Option[] = [];

export const ProductEdit = () => {

  const match = useMatch('/products/:productId');
  const selectedProductId = match?.params.productId;

  console.log(selectedProductId);

  const [product, setProduct] = useState<Product>();
  const [errors, setErrors] = useState<Error[]>();
  const [newName, setNewName] = useState<string>();
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<Category[]>();

  useEffect(() => {
    getCategoriesList()
    .then(((data: { data: React.SetStateAction<Category[] | undefined>; }) => {
      setCategoriesList(data.data);
    }))
    .catch((error: React.SetStateAction<Error[] | undefined>) => 
    setErrors(error));
  }, []);

  if(categoriesList) {
    options = categoriesList.map(category => {
      return {value: category.name, label: category.name}
    })
  }
  useEffect(() => {
    if(selectedProductId){
      getProduct(+selectedProductId)
      .then((data: { data: React.SetStateAction<Product | undefined>; }) => {
        setProduct(data.data);
        console.log("product", {...product});
      }
      )
      .catch((error: React.SetStateAction<Error[] | undefined>) => setErrors(error));
    }
  }, [selectedProductId]);

  useEffect(() => {
    if(selectedProductId) {
      setNewName(product?.name);
    }
  },[product?.name, selectedProductId]);

  useEffect(() => {
    if(selectedProductId) {
      getCategory(product?.category_id)
      .then((data: { data: { 
        name: React.SetStateAction<string>; 
      }; }) => 
        setNewCategoryName(data.data.name))
    }
  },[product?.category_id, selectedProductId]);

  const customFilter = useCallback((candidate: Option, input: string) => {
    if (input) {
      input = input.toLowerCase();
      candidate.label = candidate.label.toLowerCase();
        return candidate.label.startsWith(input);
      }
    return true; // if not search, then all match
  }, []);

  function findCategoryId(name: string) {
    if(name && categoriesList){
      return (categoriesList?.find(category => category.name === name))?.id;
    }
  }
  const navigate = useNavigate();
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    editProduct({...product, 
      name: newName,
      category_id: findCategoryId(newCategoryName),
    }
    );

    navigate('/products');
    window.location.reload();
    }

return ( 
  selectedProductId && (
    <>
    <div className='mx-3 w-25'>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            value={newName}
            className="form-control form-control-lg"
            onChange={(event)=> {
              setNewName(event.target.value)
            }}
          >
          </input>
            {newName}
        </div>
        <div className="form-group">
        <label>Category: </label>
          <Select 
            options={options} 
            placeholder={newCategoryName}
            filterOption={customFilter}
            onChange={(choice) => {if(choice)setNewCategoryName(choice.value)}}
          />
        </div>
        <button type='submit' className="btn btn-primary mb-2 mt-3">
          Submit
        </button>
      </form>
    </div>
    </>
    )
)}