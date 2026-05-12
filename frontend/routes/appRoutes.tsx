import type { RouteObject } from 'react-router-dom';
import Products from '../pages/products/Products';
import Categories from '../pages/categories/Categories';

export const appRoutes: RouteObject[] = [
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "Categories",
    element: <Categories />,
  }
];