import { NavLink, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Products } from './components/Products/Products.tsx';
import { Categories } from './components/Categories/Categories.tsx';
import { Home } from './components/Home/Home.tsx';
import { ProductEdit } from './components/ProductEdit/ProductEdit.tsx'
import { Category } from './react-app-env';
import {CategoryEdit } from './components/CategoryEdit/CategoryEdit.tsx'
import { CategoryAdd } from './components/CategoryAdd/CategoryAdd.tsx'
import { ProductAdd } from './components/ProductAdd/ProductAdd.tsx'
import BasicExample from './components/random/Products.tsx';

const App = () => (
  <div className="App">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink
              to="/"
              className="nav-link"
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item active">
            <NavLink
              to="/products"
              className="nav-link"
            >
              Products
            </NavLink>
          </li>

          <li className="nav-item active">
            <NavLink
              to="/categories"
              className="nav-link"
            >
              Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products/add" element={<ProductAdd />} />
      <Route path="/categories/add" element={<CategoryAdd />} />
      <Route path="/products/:productId" element={<ProductEdit />} />
      <Route path="/categories/:categoryId" element={<CategoryEdit />} />

    </Routes>
  </div>
);

export default App;