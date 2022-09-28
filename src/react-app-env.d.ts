export interface Product {
  id: number;
  name: string;
  category_id: number;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  category_id: number;
}

export interface fullObject 
  {
    id: number;
    uid: string;
    name: string,
    recipe_amount: number,
    type: string,
    status: string,
    measure_type: string,
    category_id: number,
    tax_id: number,
    updated_at: string,
    cost_price_money: {
        amount: number,
        currency: string
    },
    cost_price_gross_money: {
        amount: number,
        currency: string,
    },
    state: {
        in_stock_amount: number,
        commited_amount: number,
        incoming_amount: number,
        available_amount: number,
    },
    category: string,
}
