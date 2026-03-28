export interface Ingredient {
  _id: string;
  name: string;
  category: 'base' | 'sauce' | 'cheese' | 'veggie' | 'protein';
  price: number;
  stockLeft: number;
}

export const ingredientsData: Ingredient[] = [
  // Bases
  { _id: 'b1', name: 'Thin Crust', category: 'base', price: 100, stockLeft: 10 },
  { _id: 'b2', name: 'Classic Hand-Tossed', category: 'base', price: 150, stockLeft: 10 },
  { _id: 'b3', name: 'Stuffed Crust', category: 'base', price: 200, stockLeft: 10 },
  { _id: 'b4', name: 'Whole Wheat', category: 'base', price: 120, stockLeft: 10 },
  { _id: 'b5', name: 'Gluten-Free', category: 'base', price: 180, stockLeft: 10 },

  // Sauces
  { _id: 's1', name: 'Marinara', category: 'sauce', price: 30, stockLeft: 10 },
  { _id: 's2', name: 'Alfredo', category: 'sauce', price: 40, stockLeft: 10 },
  { _id: 's3', name: 'BBQ', category: 'sauce', price: 40, stockLeft: 10 },
  { _id: 's4', name: 'Pesto', category: 'sauce', price: 50, stockLeft: 10 },
  { _id: 's5', name: 'Hot Honey', category: 'sauce', price: 40, stockLeft: 10 },

  // Cheeses
  { _id: 'c1', name: 'Mozzarella', category: 'cheese', price: 50, stockLeft: 10 },
  { _id: 'c2', name: 'Cheddar', category: 'cheese', price: 60, stockLeft: 10 },
  { _id: 'c3', name: 'Parmesan', category: 'cheese', price: 70, stockLeft: 10 },

  // Veggies
  { _id: 'v1', name: 'Bell Pepper', category: 'veggie', price: 30, stockLeft: 10 },
  { _id: 'v2', name: 'Onion', category: 'veggie', price: 20, stockLeft: 10 },
  { _id: 'v3', name: 'Mushroom', category: 'veggie', price: 40, stockLeft: 10 },
  { _id: 'v4', name: 'Jalapeño', category: 'veggie', price: 30, stockLeft: 10 },
  { _id: 'v5', name: 'Black Olive', category: 'veggie', price: 40, stockLeft: 10 },

  // Proteins
  { _id: 'p1', name: 'Pepperoni', category: 'protein', price: 80, stockLeft: 10 },
  { _id: 'p2', name: 'Chicken Tikka', category: 'protein', price: 90, stockLeft: 10 },
  { _id: 'p3', name: 'Grilled Chicken', category: 'protein', price: 90, stockLeft: 10 },
  { _id: 'p4', name: 'Paneer Chunks', category: 'protein', price: 70, stockLeft: 10 },
];
