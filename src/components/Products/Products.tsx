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
    <h1>
      <span className="ml-1 px-4">PRODUCTS </span>
      <Link
        to={`/products/add`}
        className="btn btn-success btn-sm mx-auto"
      >
      {"ADD"}
    </Link>
    </h1>

      <div>
        <ul className="list-group">
          {productsList?.map(product => (
            <li key={product.name} className="list-group-item mx-2">
              <div className="d-inline-block px-3">
                <span className="text-secondary">
                  <small>
                    Name: 
                  </small>
                </span>
                <span>
                  <strong>
                    {product.name}
                  </strong>
                </span>
              </div>

              <div className="d-inline-block px-3">
                <span className="text-secondary ">
                  <small>
                    Category: 
                  </small>
                </span>
                <span>
                  <strong>
                    {product.category}
                  </strong>
                </span>
              </div>
              <div className="d-inline-block px-3">
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-warning btn-sm mx-auto"
                >
                  {"Edit"}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};