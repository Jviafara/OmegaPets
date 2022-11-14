import CarritoListar from './views/carrito/carritolistar';
import FacturasListar from './views/facturas/facturaslistar';
import Facturadetalle from './views/facturas/facturaseditar';
import ProductosListar from './views/productos/productoslistar';
import UsuarioListar from './views/usuarios/usuariolistar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductoDetail from './views/productos/cliente-productodetail';
import ProductosListarC from './views/productos/cliente-productoslistar';
import ProductosDetalle from './views/productos/productoeditar';

import React from 'react';
import CrearCuenta from './views/auth/CrearCuenta';
import Login from './views/auth/Login';
import Home from './views/Home';
import Profile from './views/usuarios/profile';
import UsuariosEditar from './views/usuarios/usuarioEditar';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} exact></Route>
					<Route path="/login" element={<Login />} exact></Route>
					<Route
						path="/registrar"
						element={<CrearCuenta />}
						exact></Route>
					<Route
						path="/productos"
						element={<ProductosListar />}
						exact></Route>
					<Route
						path="/usuarios"
						element={<UsuarioListar />}
						exact></Route>
					<Route
						path="/usuarioseditar/:id"
						element={<UsuariosEditar />}
						exact></Route>
					<Route
						path="/profile/:id"
						element={<Profile />}
						exact></Route>
					<Route
						path="/facturaseditar/:id"
						element={<Facturadetalle />}
						exact></Route>
						<Route
						path="/facturas"
						element={<FacturasListar />}
						exact></Route>
					
					<Route
						path="/productoseditar/:id"
						element={<ProductosDetalle />}
						exact></Route>
					<Route
						path="/productosdetail/:id"
						element={<ProductoDetail />}
						exact></Route>
					<Route
						path="/productos-cliente"
						element={<ProductosListarC />}
						exact></Route>
					<Route
						path="/productos-cliente"
						element={<ProductosListarC />}
						exact></Route>
					<Route
						path="/carrito"
						element={<CarritoListar />}
						exact></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
