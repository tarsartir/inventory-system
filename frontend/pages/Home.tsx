import { useEffect, useState } from 'react';
import api from '../api/axios';

interface ApiResponse {
  status: string;
  message: string;
  data: {
    php_version: string;
    ci_version: string;
  };
}

const Home = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/test');
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="card-body">
      <h2 className="card-title text-2xl font-bold mb-4">API Status (Axios)</h2>

      {loading && (
        <div className="flex justify-center py-4">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-sm mb-4">
          <span>{error}</span>
        </div>
      )}

      {data && data.data ? (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="badge badge-primary p-4 w-full font-semibold">
            {data.message}
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-base-200 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm opacity-70">PHP</span>
              <span className="font-mono font-bold">{data?.data?.php_version}</span>
            </div>
            <div className="bg-base-200 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm opacity-70">CI4</span>
              <span className="font-mono font-bold">{data?.data?.ci_version}</span>
            </div>
          </div>

          <button className="btn btn-outline btn-primary btn-block mt-4" onClick={checkConnection}>
            Refrescar Datos
          </button>
        </div>
      ) : (
        !loading && !error && <p className="text-center">Esperando respuesta del servidor...</p>
      )}
    </div>
  );
};

export default Home;