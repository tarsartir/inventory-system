const Productos = () => {
  const listaProductos = [
    { id: 1, nombre: 'Laptop Pro', stock: 15, precio: '$1200' },
    { id: 2, nombre: 'Mouse Óptico', stock: 50, precio: '$25' },
    { id: 3, nombre: 'Monitor 24"', stock: 8, precio: '$200' },
  ];

  return (
    <div className="card-body">
      <h2 className="card-title text-2xl font-bold mb-4">Gestión de Productos</h2>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((p) => (
              <tr key={p.id}>
                <th>{p.id}</th>
                <td>{p.nombre}</td>
                <td>{p.stock} units</td>
                <td>{p.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;