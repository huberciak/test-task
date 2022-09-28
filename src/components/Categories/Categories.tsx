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
    .then((data: { data: React.SetStateAction<Category[] | undefined>; }) => setCategoriesList(data.data))
    .catch((error: React.SetStateAction<undefined>) => setErrors(error));
  }, []);

  return (
    <>
    <h1>Categories</h1>
    <Link
        to={`/categories/add`}
        className="button"
    >
      {"Add"}
    </Link>
      <div>
        <ul>
          {categoriesList?.map(category => (
            <li key={category.name}>
                {category.name}
            <Link
              to={`/categories/${category.id}`}
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