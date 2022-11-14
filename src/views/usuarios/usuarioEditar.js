import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../componentes/header';
import SideBar from '../componentes/sideBar';

function UsuariosEditar() {
	const params = useParams();
	const navegar = useNavigate();

	const token = localStorage.getItem('token');
	let bearer;
	if (token === '') {
		bearer = '';
	} else {
		bearer = `${token}`;
	}

	const config = {
		headers: { 'x-auth-token': bearer },
	};

	const [nombres, setNombre] = useState('');
	const [apellidos, setApellido] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [docIdentificacion, setDocIdentificacion] = useState('');
	const [idRol, setIdRol] = useState('');
	const [fechaNacimiento, setFechaNacimiento] = useState('');
	const [genero, setGenero] = useState('');
	const [telefono, setTelefono] = useState('');
	const [direccion, setDireccion] = useState('');
	const [ciudad, setCiudad] = useState('');

	useEffect(() => {
		axios
			.get(`/OmegaPets/usuario/buscarSinAuth/${params.id}`)
			.then((res) => {
				console.log(res.data.result);
				const dataUsuario = res.data.result[0];
				setIdRol(dataUsuario.idRol);
				setEmail(dataUsuario.email);
				setPassword(dataUsuario.password);
				setNombre(dataUsuario.nombres);
				setApellido(dataUsuario.apellidos);
				setDocIdentificacion(dataUsuario.docIdentificacion);
				setFechaNacimiento(dataUsuario.fechaNacimiento);
				setGenero(dataUsuario.genero);
				setDireccion(dataUsuario.direccion);
				setTelefono(dataUsuario.telefono);
				setCiudad(dataUsuario.ciudad);
			});
	}, [params.id]);

	function handleSubmit(event) {
		Swal.fire({
			title: '¿deseas ejecutar esta acción?',
			text: 'Estas a punto editar un registro',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, actualizalo!',
		}).then((result) => {
			if (result.isConfirmed) {
				const body = {
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
				setTimeout(() => {
					axios
						.post(
							`/OmegaPets/usuario/editar/${params.id}`,
							body,
							config
						)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
				}, 1000);

				Swal.fire(
					'Registro editado!',
					'El registro ha sido actualizado con éxito.',
					'success'
				).then(navegar('/usuarios'));
			}
		});
		event.preventDefault();
	}

	function usuariosRegresar() {
		navegar('/usuarios');
	}

	return (
		<div className="wrapper">
			<SideBar></SideBar>
			<Header></Header>

			<div className="pcoded-main-container">
				<div className="pcoded-content ">
					<div className="row list-users">
						<div className="card">
							<h4 align="center">Editar Usuarios</h4>
							<div className="col">
								<form
									onSubmit={handleSubmit}
									class="row g-3 needs-validation"
									novalidate>
									<div class="col-md-4">
										<label for="email" class="form-label">
											E-mail
										</label>
										<input
											type="text"
											class="form-control"
											id="email"
											value={email}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											required
										/>
										<div class="valid-feedback">
											Looks good!
										</div>
									</div>
									<div class="col-md-4">
										<label
											for="contraseñá"
											class="form-label">
											Contraseña
										</label>
										<input
											type="password"
											class="form-control"
											id="contraseña"
											value={password}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											required
										/>
										<div class="valid-feedback">
											Looks good!
										</div>
									</div>
									<div className="col-md-4">
										<label for="rol" class="form-label">
											Rol
										</label>
										<select
											id="idRol"
											class="form-control form-select-md mb-2"
											aria-label=".form-select-md">
											<option value={idRol} selected>
												Seleccione un Rol
											</option>
											<option value="1">
												Administrador
											</option>
											<option value="2">Cliente</option>
										</select>
									</div>
									<div class="col-md-4">
										<label for="nombres" class="form-label">
											Nombres
										</label>
										<div class="input-group has-validation">
											<input
												type="text"
												class="form-control"
												value={nombres}
												onChange={(e) => {
													setNombre(e.target.value);
												}}
												id="nombres"
												aria-describedby="inputGroupPrepend"
												required
											/>
											<div class="invalid-feedback">
												Please choose a username.
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<label
											for="apellidos"
											class="form-label">
											Apellidos
										</label>
										<input
											type="text"
											class="form-control"
											value={apellidos}
											onChange={(e) => {
												setApellido(e.target.value);
											}}
											id="apellidos"
											required
										/>
										<div class="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div class="col-md-4">
										<label
											for="docIdentificacion"
											class="form-label">
											Documento de Identidad
										</label>
										<input
											type="text"
											class="form-control"
											value={docIdentificacion}
											onChange={(e) => {
												setDocIdentificacion(
													e.target.value
												);
											}}
											id="docIdentificacion"
											required
										/>
										<div class="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div class="col-md-4">
										<label
											for="fechaNacimiento"
											class="form-label">
											Fecha de Nacimiento
										</label>
										<input
											type="text"
											class="form-control"
											disabled
											value={fechaNacimiento}
											id="fechaNacimiento"
										/>
										<div class="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div className="col-md-4">
										<label for="genero" class="form-label">
											Genero
										</label>
										<select
											id="genero"
											class="form-control form-select-md mb-2"
											aria-label=".form-select-md ">
											<option value={genero} selected>
												Seleccione un Genero
											</option>
											<option value="femenino">
												Femenino
											</option>
											<option value="masculino">
												Masculino
											</option>
											<option value="undefined">
												No Especificar
											</option>
										</select>
									</div>
									<div class="col-md-4">
										<label
											for="telefono"
											class="form-label">
											Telefono
										</label>
										<input
											type="text"
											class="form-control"
											value={telefono}
											onChange={(e) => {
												setTelefono(e.target.value);
											}}
											id="telefono"
											required
										/>
										<div class="invalid-feedback">
											Please provide a valid city.
										</div>
									</div>
									<div class="col-md-4">
										<label
											for="direccion"
											class="form-label">
											Direccion
										</label>
										<input
											type="text"
											class="form-control"
											value={direccion}
											onChange={(e) => {
												setDireccion(e.target.value);
											}}
											id="direccion"
											required
										/>
										<div class="invalid-feedback">
											Please enter a message in the
											textarea.
										</div>
									</div>
									<div class="col-md-4">
										<label for="ciudad" class="form-label">
											Ciudad
										</label>
										<input
											type="text"
											class="form-control"
											id="ciudad"
											value={ciudad}
											onChange={(e) => {
												setCiudad(e.target.value);
											}}
											required
										/>
										<div class="invalid-feedback">
											Please enter a message in the
											textarea.
										</div>
									</div>
									<div class="col-12">
										<button
											class="btn btn-primary"
											type="submit">
											Actualizar
										</button>
										<button
											type="button"
											className="btn btn-info m-3 "
											onClick={usuariosRegresar}>
											Atras
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default UsuariosEditar;
