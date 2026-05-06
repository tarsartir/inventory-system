# [📦 Inventory Pro - Sistema de Gestión de Inventario]


> Sistema web desarrollado con CodeIgniter 4 (Backend) y React + DaisyUI (Frontend).


## 🚀 Descripción del Proyecto
Inventory Pro es una aplicación web moderna diseñada para el control eficiente de productos y categorías. Utiliza una arquitectura desacoplada con un Backend RESTful robusto y un Frontend SPA (Single Page Application) altamente reactivo.


## 🛠️ Tecnologías Utilizadas


### Backend
- **[CodeIgniter 4.x](https://codeigniter4.github.io/userguide/)**: Framework PHP (liviano).
- **PHP 8.5**
- **SQLite**


### Frontend
- **[React 19.2](https://reactjs.org)**: Biblioteca de UI.
- **[Tailwind 4 CSS](https://tailwindcss.com/)**: Framework CSS de utilidad.
- **[DaisyUI](https://daisyui.com/)**: Componentes de Tailwind CSS.
- **[Vite](https://vitejs.dev)**: Constructor de aplicaciones frontend rápidas.


---


## 📂 Estructura del Proyecto


```text
├── app/                  # Backend: CodeIgniter 4 App
├── frontend/             # Frontend: React Application
│   ├── components/       # Componentes: React Application
│   │   ├── products/
│   │   │   ├── ProductModal.jsx
│   │   │   └── ProductTable.jsx
│   │   ├── Navbar.jsx
│   │   └── SIdebar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/               # Backend: Archivos públicos (assets, index.php)
├── tests/                # tests de CI4
├── vendor/               # Dependencias de PHP
├── vite-project/         # Dependencias de PHP
├── node_modules/         # Dependencias de NodeJS
├── writable/database/database.sqlite  # DataBase
├── .env                  # Variables de entorno CI4
└── README.md
```


---


## 🛠️ Instalación y Configuración


### Prerrequisitos
- PHP >= 8.2
- Composer
- Node.js & NPM
- SQLite


### 1. Clonar el repositorio
```bash
git clone https://github.com/tarsartir/inventory-system.git
cd inventory-system
```


### 2. Configurar Backend (CI4)
```bash
composer install
cp env .env
```
*  Abre `.env` y configura la base de datos
```bash
database.default.DBDriver = SQLite3
database.default.database = writable/database.sqlite
```
### 3. Configurar Frontend (React)
```bash
cd src
npm install
# O si usas yarn: yarn install
```


### 4. Configurar Base de Datos
*  Ejecuta las migraciones de CodeIgniter 4:
   ```bash
   php spark migrate
   ```


### 5. Llenar la base de datos
*  Ejecuta los seeders de CodeIgniter 4:
   ```bash
   php spark db:seed MainSeeder
   ```


---


## 🖥️ Ejecución de la Aplicación


Para que funcione, necesitas ejecutar tanto el servidor de PHP como el de React.


### 1. Servidor Backend
```bash
php spark serve
```
*(Por defecto en http://localhost:8080)*


### 2. Servidor Frontend
```bash
cd src
npm run dev
# O si usas yarn: yarn dev
```
*(Por defecto en http://localhost:5173)*


---


## 📦 Producción (Build)


Para generar la versión final de producción:


```bash
cd src
npm run build
```
*(Esto generará los archivos en el `public/assets`)*


---


## 🧩 Principales Funcionalidades
- [x] CRUD de [Entidad 1]
- [x] Autenticación JWT
- [x] Dashboard con DaisyUI
- [x] Reportes PDF


## 🤝 Autor
- **David Mora**
- **Correo:** davidmora000@gmail.com
- **[Linkedin](www.linkedin.com/in/david-antnio-mora-alviarez-504334a6)**


---


## 📄 Licencia
Este proyecto está bajo la licencia
