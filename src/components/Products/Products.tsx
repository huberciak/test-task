import { tab } from '@testing-library/user-event/dist/tab';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useMatch } from 'react-router-dom';
import { Route, useNavigate } from 'react-router-dom';
import { DiagnosticCategory } from 'typescript';
import { findCategories } from '../../api.ts';
import { getProductsList, getCategoriesList } from '../../api.ts';
import { Product, Category} from '../../react-app-env';

export const Products: React.FC = () => {

  const [productsList, setProductList] = useState<Product[]>();
  const [errors, setErrors] = useState<Error[]>();
  const [categoriesList, setCategoriesList] = useState<Category[]>();

  useEffect(() => {
    getProductsList()
    .then((data: { data: React.SetStateAction<Product[] | undefined>; }) => setProductList(data.data))
    .catch((error: React.SetStateAction<Error[] | undefined>) => setErrors(error));
  }, []);

  useEffect(() => {
    getCategoriesList()
    .then(((data: { data: React.SetStateAction<Category[] | undefined>; }) => setCategoriesList(data.data)))
    .catch((error: React.SetStateAction<Error[] | undefined>) => setErrors(error));
  }, []);

  findCategories(productsList, categoriesList);
  
  return (
    <>
    <h1>Products</h1>
    <Link
        to={`/products/add`}
        className="button"
    >
    {"Add"}
    </Link>
      <div>
        <ul>
          {productsList?.map(product => (
            <li key={product.name}>
                {product.name}, {product.category}
            <Link
              to={`/products/${product.id}`}
              className="button"
            >
              {"Edit"}
            </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};