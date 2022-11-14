import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";

//Crear un componente para desplegar listados

function FacturasListar() {
	const [facturaUsuario, setfacturaUsuario] = useState([]);

	useEffect(() => {
		/* Haciendo una petición GET a la URL `OmegaPets/factura/listar` */
		axios
			.get(`OmegaPets/factura/facturausuariocarrito`)
			.then((res) => {
				console.log(res.data);
				setfacturaUsuario(res.data);
				console.log(res.data[0].facturaCarrito[0].totalCompra)
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='wrapper'>
			<Header></Header>
			<SideBar></SideBar>
			<div>
				<div className="pcoded-main-container">
					<div className="pcoded-content">
						<div className='card'>
							<div className='card-body'>
								<div >
									{/* <SideBar></SideBar>
			<Header></Header> */}



									<div className="container " align="center">
										<h4>Lista de Facturass</h4>
										<div className="row">
											<div className="col-md-12">
												<table className="table table-bordered">
													<thead className="thead-dark">
														<tr>
															<td align="center">Id</td>
															<td>Fecha Factura</td>
															<td>Nombre</td>
															<td>Apellido</td>
															<td>Email</td>
															<td>Estado</td>
															<td>Total Compra</td>
														</tr>
													</thead>
													<tbody>
														{facturaUsuario.map((mifactura) => (
															<tr>
																<td align="center">
																	{mifactura.idFactura}
																</td>
																<td>{mifactura.fechaFactura}</td>
																<td>
																	{
																		mifactura.facturaUsuario
																			.nombres
																	}
																</td>
																<td>
																	{
																		mifactura.facturaUsuario
																			.apellidos
																	}
																</td>
																<td>
																	{mifactura.facturaUsuario.email}
																</td>
																<td>
																	{mifactura.estado
																		? 'Pago Pendiente'
																		: 'Pago realizado'}
																</td>
																<td>
																	{
																		mifactura.facturaCarrito[0]
																			?.totalCompra
																	}
																</td>
																<td align="center">
																	<Link to={`/facturaseditar/${mifactura._id}`}>
																		<li className="btn btn-success">Editar</li>
																	</Link>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
										<section className="mt-5 mb-5">
											<div align="center">Copyright (c) 2022 - MisionTIC</div>
										</section>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FacturasListar;

