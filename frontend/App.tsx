import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
        
        <div className="flex gap-4 p-4 justify-center border-b border-base-200">
          <Link to="/" className="btn btn-ghost btn-sm">Inicio</Link>
          <Link to="/products" className="btn btn-ghost btn-sm">Productos</Link>
        </div>

        <Outlet />
      
    </div>
  );
};

export default App;