import { tab } from '@testing-library/user-event/dist/tab';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useMatch } from 'react-router-dom';
import { Route, useNavigate } from 'react-router-dom';
import { DiagnosticCategory } from 'typescript';
import { getCategoriesList } from '../../api.ts';
import { Category } from '../../react-app-env';

export const Categories: React.FC = () => {

  const [categoriesList, setCategoriesList] = useState<Category[]>();
  const [errors, setErrors] = useState();

  useEffect(() => {
    getCategoriesList()
    .then((data: { data: React.SetStateAction<Category[] | undefined>; }) => {
    setCategoriesList(data.data)
  })
    .catch((error: React.SetStateAction<undefined>) => setErrors(error));
  }, []);

  return (
    <>
    <h1>
      <span className="ml-1 px-4">CATEGORIES </span>
      <Link
        to={`/categories/add`}
        className="btn btn-success btn-sm mx-auto"
      >
      {"ADD"}
    </Link>
    </h1>
      <div>
        <ul className="list-group">
          {categoriesList?.map(category => (
            <li key={category.name} className="list-group-item mx-2">
              <div className="d-inline-block px-3">
                <span className="text-secondary">
                  <small>
                    Name: 
                  </small>
                </span>
                <span>
                  <strong>
                    {category.name}
                  </strong>
                </span>
              </div>
              <div className="d-inline-block px-3">
                <Link
                  to={`/categories/${category.id}`}
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