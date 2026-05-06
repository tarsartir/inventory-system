import type { RouteObject } from 'react-router-dom';
import Products from '../pages/products/Products';

export const productsRoutes: RouteObject[] = [
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "products/new",
    element: <div>Página para crear producto</div>,
  },
  {
    path: "products/edit/:id",
    element: <div>Página para editar producto</div>,
  }
];