import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-base-300 p-8 flex flex-col items-center justify-center font-sans">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-primary/10">
        
        <div className="flex gap-4 p-4 justify-center border-b border-base-200">
          <Link to="/" className="btn btn-ghost btn-sm">Inicio</Link>
          <Link to="/products" className="btn btn-ghost btn-sm">Productos</Link>
        </div>

        <Outlet />
        
      </div>
    </div>
  );
};

export default App;