export interface Restaurant {
  id: string;
  name: string;
  cover: string;
  address: string;
  categories: string[];
  reviews: Reviews;
  menu: { items: MenuItem[] };
  deliveryCharge: number;
}

export interface Reviews {
  average: number;
  count: number;
}

export interface MenuItem {
  id: string;
  name: string;
  weight: number;
  type: string;
  kcal: number;
  price: number;
}
