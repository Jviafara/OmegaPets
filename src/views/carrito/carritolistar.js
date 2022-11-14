import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import uniquid from 'uniqid';
import Header from '../componentes/header';
import SideBar from '../componentes/sideBar';

//Crear un componente para desplegar listados

function CarritoListar() {
	const [dataCarrito, setdataCarrito] = useState([]);
	const [subTotal, setSubtotal] = useState(0);
	const [idcarrito, setIdCarrito] = useState();
	const userId = localStorage.getItem('UserId');

	function actualizarCantidad(idProducto, cantidadProducto) {
		console.log(idProducto, cantidadProducto);
		const newDataCarrito = dataCarrito.map((articulo) => {
			if (articulo.idProducto === idProducto) {
				articulo.cantidad = cantidadProducto;
			}
			return articulo;
		});
		console.log('newDataCarrito', newDataCarrito);
		setdataCarrito(newDataCarrito);
	}

	function removerArticuloCarrito(productoId, carritoId) {
		console.log('productoId', productoId, 'carritoId', carritoId);
		// todo la logica de borrado
		axios
			.delete(
				`OmegaPets/articulo/articulocarrito/${carritoId}/${productoId}`
			)
			.then(cargarArticulos);
	}

	function cargarArticulos() {
		// necesitamos saber de donde sale el id del usuario
		axios
			.get(`OmegaPets/carrito/carritoPorEstado/activo/1`)
			.then((response) => {
				const carrito = response.data;
				if (carrito) {
					return axios.get(
						`Omegapets/articulo/articulocarrito/${carrito.idCarritoCompra}`
					);
				} else {
					return axios
						.post('Omegapets/carrito/crear', {
							idCarritoCompra: uniquid(),
							estado: 'activo',
							idUsuario: '1',
						})
						.then((response) => {
							return {
								data: {
									...response.data.message,
									articulos: [],
								},
							};
						});
				}
			})
			.then((res) => {
				console.log(res.data);
				setIdCarrito(res.data.idCarritoCompra);
				setdataCarrito(res.data.articulos);
			})
			.catch((err) => console.log(err));
	}
	useEffect(() => {
		console.log('componente cargado');
		cargarArticulos();
	}, []);

	useEffect(() => {
		console.log('cambio el carrito', dataCarrito);
		const subtotalTemporal = dataCarrito.reduce((acum, articulo) => {
			return acum + articulo.precio * (articulo.cantidad || 1);
		}, 0);
		setSubtotal(subtotalTemporal);
	}, [dataCarrito]);

	return (
		<div className="wrapper">
			<SideBar></SideBar>
			<Header></Header>
			<section className="pcoded-main-container">
				<div className="pcoded-content">
					<div className="row">
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">
									<h5>Mi Carrito</h5>
								</div>
								<div className="card-body table-border-style">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th align="center">
														Producto
													</th>
													<th></th>
													<th className="text-center">
														Precio
													</th>
													<th className="text-center">
														Cantidad
													</th>
													<th className="text-center">
														Subtotal
													</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{dataCarrito.map((articulo) => (
													<tr
														key={
															articulo.idArticulo
														}>
														<td align="center">
															<img
																src={
																	articulo.foto
																}
																width="150"></img>
														</td>
														<td align="left">
															<div>
																{' '}
																<strong>
																	{' '}
																	{
																		articulo.nombreProducto
																	}{' '}
																</strong>
															</div>
															<div>
																{
																	articulo.descripcion
																}
															</div>
														</td>
														<td align="center">
															{' '}
															{articulo.precio}
														</td>
														<td align="center">
															<input
																id="number"
																type="number"
																onChange={(
																	e
																) => {
																	actualizarCantidad(
																		articulo.idProducto,
																		e.target
																			.value
																	);
																}}
															/>{' '}
														</td>
														<td align="center">
															{articulo.precio *
																(articulo.cantidad ||
																	1)}
														</td>
														<td align="center">
															{' '}
															<button
																type="button"
																className="btn btn-icon btn-danger"
																onClick={() => {
																	removerArticuloCarrito(
																		articulo.idProducto,
																		idcarrito
																	);
																}}>
																<i className="feather icon-trash"></i>
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="card">
								<div className="card-body table-border-style">
									<div className="table-responsive">
										<table className="table table-striped">
											<thead>
												<tr>
													<th
														colSpan="2"
														align="center">
														Resumen de mi compra
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<strong>
															Subtotal
														</strong>
													</td>
													<td>{subTotal}</td>
												</tr>
												<tr>
													<td>
														<strong>Total</strong>
													</td>
													<td>{subTotal}</td>
												</tr>
											</tbody>
										</table>
										<button
											type="button"
											className=" btn  btn-primary">
											{' '}
											Continuar con mi compra
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="mt-5 mb-5">
				<div align="center">Copyright (c) 2022 - MisionTIC</div>
			</section>
		</div>
	);
}

export default CarritoListar;
