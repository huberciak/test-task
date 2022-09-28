import { Category, Product } from "./react-app-env";

const API_URL = 'https://newdemostock.gopos.pl/';

const headers = {'Authorization' : 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e'}

export function getProductsList() {
  return fetch(`${API_URL}/ajax/219/products`, { headers })
    .then(response => response.json());
}

export function getProduct(productId: number) {
  return fetch(`${API_URL}/ajax/219/products/${productId}`, { headers })
    .then(response => response.json());
}

export function getCategoriesList() {
  return fetch(`${API_URL}/ajax/219/product_categories`, { headers })
  .then(response => response.json());
}

export function findCategories(
  productsList: Product[] | undefined, 
  categoriesList: Category[] | undefined,
) {
  if (productsList && categoriesList) {
    for (let product of productsList) {
      console.log(product);
      for(let category of categoriesList) {
        if(product.category_id === category.id) {
          Object.assign(product, { category: category.name})
        }
      }
    }  
  }
}

export function getCategory(categoryId: number) {
  return fetch(
    `${API_URL}ajax/219/product_categories/${categoryId}`, 
    { headers })
  .then(response => response.json());
}

export function editCategory(
  categoryId: number,
  newName: string,
  ) {
  fetch(`${API_URL}ajax/219/product_categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(
      {
        id: categoryId,
        name: newName,
      }
    ),
    headers: {
      'Authorization' : 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      'Content-type': 'application/json',
      'accept' : 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
}

export function editProduct(
  product: Product,
  ) {
  fetch(`${API_URL}ajax/219/products/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(
      {...product}
    ),
    headers: {
      'Authorization' : 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      'Content-type': 'application/json',
      'accept' : 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
}

export function addProduct(
  product: Product,
  ) {
  fetch(`${API_URL}/ajax/219/products`, {
    method: 'POST',
    body: JSON.stringify(
      {...product}
    ),
    headers: {
      'Authorization' : 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      'Content-type': 'application/json',
      'accept' : 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Data", data);
    data.errors.forEach((error: { field: string; message: string; }) => {
      alert("Field: " + error.field + "\nMessage: " + error.message);
    });
  })
  .catch((err) => {
    console.log("Error", err.message);
  });
}

export function addCategory(
  name: string,
  ) {
  fetch(`${API_URL}/ajax/219/product_categories`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
    }
    ),
    headers: {
      'Authorization' : 'fd9ba9e1-0788-4e8f-ac46-a43df43e205e',
      'Content-type': 'application/json',
      'accept' : 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Data", data);
    data.errors.forEach((error: { field: string; message: string; }) => {
      alert("Field: " + error.field + "\nMessage: " + error.message);
    });
  })
  .catch((err) => {
    console.log("Error", err.message);
  });
}