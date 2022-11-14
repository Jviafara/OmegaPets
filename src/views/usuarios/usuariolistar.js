import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import uniquid from 'uniqid';
import Header from '../componentes/header';
import SideBar from '../componentes/sideBar';

//Crear un componente para desplegar listados

function UsuarioListar() {
	const navegar = useNavigate();

	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('UserId');
	let bearer;
	if (token === '') {
		bearer = '';
	} else {
		bearer = `${token}`;
	}

	const config = {
		headers: { 'x-auth-token': bearer },
	};

	function usuarioBorrar(idBorrar) {
		Swal.fire({
			title: '¿Deseas ejecutar esta acción?',
			text: '¡Estas a punto eliminar un registro!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminalo!',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Registro eliminado!',
					'El registro ha sido eliminado con éxito.',
					'success'
				).then((res) => {
					navegar(0);
				});
				axios
					.delete(
						`OmegaPets/usuario/borrarSinAuth/${idBorrar}`,
						config
					)
					.catch((err) => console.log(err));
			}
		});
	}

	const [dataUsuarios, setdataUsuarios] = useState([]);

	useEffect(() => {
		axios.get(`/OmegaPets/usuario/buscarSinAuth/${userId}`).then((res) => {
			//console.log(res.data.result);
			const dataUsuario = res.data.result[0];
			const idRol = dataUsuario.idRol;
			console.log(idRol);
			if (idRol === '1') {
				axios
					.get('OmegaPets/usuario/listar', config)
					.then((res) => {
						console.log(res.data.result);
						setdataUsuarios(res.data.result);
					})
					.catch((err) => console.log(err));
			} else {
				//navegar('/');
			}
		});
	}, []);

	function handleSubmit(event) {
		Swal.fire({
			title: '¿Deseas ejecutar esta acción?',
			text: 'Estas a punto agregar un registro',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, agregalo!',
		}).then((result) => {
			if (result.isConfirmed) {
				const body = {
					idUsuario: uniquid(),
					nombres: event.target.nombres.value,
					apellidos: event.target.apellidos.value,
					email: event.target.email.value,
					password: event.target.contraseña.value,
					docIdentificacion: event.target.docIdentificacion.value,
					fechaNacimiento: event.target.fechaNacimiento.value,
					genero: event.target.genero.value,
					direccion: event.target.direccion.value,
					telefono: event.target.telefono.value,
					ciudad: event.target.ciudad.value,
					idRol: event.target.idRol.value,
				};

				console.log(body);
				axios
					.post(`/OmegaPets/usuario/crearauth`, body)
					.then((res) => {
						console.log(res);
						Swal.fire(
							'Registro editado!',
							'El registro ha sido agregado con éxito.',
							'success'
						);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
		event.preventDefault();
	}

	return (
		<div className="wrapper">
			<SideBar></SideBar>
			<Header></Header>
			<div className="pcoded-main-container">
				<div className="pcoded-content ">
					<div className="row list-users mt-3  justify-content-center">
						<div className="card">
							<h4 className="mt-3  mb-0" align="center">
								Agregar Usuario
							</h4>

							<div className="col m-3 mt-0">
								<form
									onSubmit={handleSubmit}
									className="row g-3 needs-validation m-3"
									novalidate>
									<div className="col-md-4">
										<label
											htmlfor="email"
											className="form-label">
											E-mail
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											required
										/>
										<div className="valid-feedback">
											Looks good!
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="contraseña"
											className="form-label">
											Contraseña
										</label>
										<input
											type="password"
											className="form-control"
											id="contraseña"
											required
										/>
										<div className="valid-feedback">
											Looks good!
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="rol"
											className="form-label">
											Rol
										</label>
										<select
											id="idRol"
											className="form-control mb-2"
											aria-label=".form-select-md">
											<option selected>
												Seleccione un Rol
											</option>
											<option selected="1">
												Administrador
											</option>
											<option selected="2">
												Cliente
											</option>
										</select>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="nombres"
											className="form-label">
											Nombres
										</label>
										<div className="input-group has-validation mb-2">
											<input
												type="text"
												className="form-control"
												id="nombres"
												aria-describedby="inputGroupPrepend"
												required
											/>
											<div className="valid-feedback">
												Looks good!
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="apellidos"
											className="form-label">
											Apellidos
										</label>
										<input
											type="text"
											className="form-control"
											id="apellidos"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="docIdentificacion"
											className="form-label">
											Numero de Identificacion
										</label>
										<input
											type="text"
											className="form-control"
											id="docIdentificacion"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="fechaNacimiento"
											className="form-label">
											Fecha de Nacimiento
										</label>
										<input
											type="date"
											className="form-control"
											id="fechaNacimiento"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4   ">
										<label
											htmlfor="genero"
											className="form-label">
											Genero
										</label>
										<select
											id="genero"
											className="form-control mb-2"
											aria-label=".form-select-md">
											<option selected>Genero</option>
											<option value="femenino">
												Femenino
											</option>
											<option value="Masculinos">
												Masculino
											</option>
											<option value="undefined">
												No Especificar
											</option>
										</select>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="telefono"
											className="form-label">
											Telefono
										</label>
										<input
											type="text"
											className="form-control"
											id="telefono"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="direccion"
											className="form-label">
											Direccion
										</label>
										<input
											type="text"
											className="form-control"
											id="direccion"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4">
										<label
											htmlfor="ciudad"
											className="form-label">
											Ciudad
										</label>
										<input
											type="text"
											className="form-control"
											id="ciudad"
											required
										/>
										<div className="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-12 ms-0 mt-4 mb-0">
										<button
											className="btn btn-primary btn-lg"
											type="submit">
											Crear
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="row list-users  justify-content-center">
						<div className="card">
							<h4 className="mt-3" align="center">
								Lista de Usuarios
							</h4>
							<div className="col-md-12 m-3">
								<table className="table table-striped fa-1x">
									<thead className="thead-dark">
										<tr>
											<td align="center">Id</td>
											<td align="center">Email</td>
											<td align="center">Nombres</td>
											<td align="center">Apellidos</td>
											<td align="center">Rol</td>
											<td align="center"></td>
											<td align="center"></td>
										</tr>
									</thead>
									<tbody>
										{dataUsuarios.map((miusuario) => (
											<tr>
												<td align="center">
													{miusuario.idUsuario}
												</td>
												<td align="center">
													{miusuario.email}
												</td>
												<td align="center">
													{miusuario.nombres}
												</td>
												<td align="center">
													{miusuario.apellidos}
												</td>
												<td align="center">
													{miusuario.idRol === '1'
														? 'Administrador'
														: 'Cliente'}
												</td>
												<td align="center">
													<Link
														to={`/usuarioseditar/${miusuario._id}`}>
														<li className="btn btn-success">
															Editar
														</li>
													</Link>
												</td>
												<td align="center">
													<li
														className="btn btn-danger"
														onClick={() => {
															usuarioBorrar(
																miusuario._id
															);
														}}>
														Borrar
													</li>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<section className="mt-5 mb-5">
						<div align="center">Copyright (c) 2022 - MisionTIC</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default UsuarioListar;
