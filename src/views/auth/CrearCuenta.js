import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import uniqid from 'uniqid';

const CrearCuenta = () => {
	//const navegar = useNavigate();

	const [usuario, setUsuario] = useState({
		idUsuario: '',
		nombres: '',
		apellidos: '',
		email: '',
		password: '',
		confirmar: '',
	});

	const { nombres, apellidos, email, password, confirmar } = usuario;

	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		document.getElementById('nombres').focus();
	}, []);

	const crearCuenta = async () => {
		if (password !== confirmar) {
			const msg = 'Las contraseñas son diferentes.';
			Swal.fire({
				title: 'Error',
				text: msg,
				icon: 'error',
				buttons: {
					confirm: {
						text: 'Ok',
						value: true,
						visible: true,
						className: 'btn btn-danger',
						closeModal: true,
					},
				},
			});
		} else if (password.length < 6) {
			const msg = 'La contraseña deber ser al menos de 6 caracteres.';
			Swal.fire({
				title: 'Error',
				text: msg,
				icon: 'error',
				buttons: {
					confirm: {
						text: 'Ok',
						value: true,
						visible: true,
						className: 'btn btn-danger',
						closeModal: true,
					},
				},
			});
		} else {
			const body = {
				idUsuario: uniqid(),
				nombres: usuario.nombres,
				apellidos: usuario.apellidos,
				email: usuario.email,
				password: usuario.password,
				idRol: '2',
			};

			console.log(body);
			axios
				.post(`/OmegaPets/usuario/crearauth`, body)
				.then((res) => {
					console.log(res);
					const mensaje = res.data.msg;
					if (mensaje === 'El usuario ya existe') {
						const msg = 'El usuario ya existe.';
						Swal.fire({
							title: 'Error',
							text: msg,
							icon: 'error',
							buttons: {
								confirm: {
									text: 'Ok',
									value: true,
									visible: true,
									className: 'btn btn-danger',
									closeModal: true,
								},
							},
						});
					} else {
						const msg = 'El usuario fue creado correctamente.';
						Swal.fire({
							title: 'Información',
							text: msg,
							icon: 'success',
							buttons: {
								confirm: {
									text: 'Ok',
									value: true,
									visible: true,
									className: 'btn btn-primary',
									closeModal: true,
								},
							},
						});

						setUsuario({
							nombre: '',
							email: '',
							password: '',
							confirmar: '',
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		crearCuenta();
	};

	return (
		<div class="auth-wrapper">
			<div class="auth-content text-center">
				<a href="/" class="f-w-400">
					<img
						src="/Logotipo/omegaPet_logo_horizontal2.png"
						alt=""
						class="img-fluid mb-4"
						height="150"
						width="150"
					/>
				</a>
				<div class="card borderless">
					<div class="row align-items-center text-center">
						<div class="col-md-12">
							<div class="card-body">
								<h4 class="f-w-400">Sign up</h4>
								<hr />
								<form
									onSubmit={onSubmit}
									class="needs-validation">
									<div class="form-group mb-3">
										<input
											type="text"
											className="form-control"
											id="nombres"
											placeHolder="Nombres"
											name="nombres"
											value={nombres}
											onChange={onChange}
										/>
									</div>
									<div class="form-group mb-3">
										<input
											type="text"
											className="form-control"
											id="apellidos"
											placeHolder="Apellidos"
											name="apellidos"
											value={apellidos}
											onChange={onChange}
										/>
									</div>
									<div class="form-group mb-3">
										<input
											type="text"
											class="form-control"
											id="email"
											placeholder="Email address"
											name="email"
											value={email}
											onChange={onChange}
										/>
									</div>
									<div class="form-group mb-4">
										<input
											type="password"
											class="form-control"
											id="password"
											placeholder="Contraseña"
											name="password"
											value={password}
											onChange={onChange}
										/>
									</div>
									<div class="form-group mb-4">
										<input
											type="password"
											class="form-control"
											id="confirmar"
											placeholder="Confirmar contraseña"
											name="confirmar"
											value={confirmar}
											onChange={onChange}
										/>
									</div>
									<button
										type="submit"
										class="btn btn-primary btn-block mb-4">
										Sign up
									</button>
									<hr />
									<p class="mb-2 text-muted">
										Ya tienes una cuenta?{' '}
										<a href="login" class="f-w-400">
											Log In
										</a>
									</p>
									<a href="/" class="f-w-400 ">
										Regresar al Inicio
									</a>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CrearCuenta;

// function handleSubmit(event) {
// 	const password = event.target.password.value;
// 	const password2 = event.target.password2.value;
// 	if (password !== password2) {
// 		const msg = 'Las Contraseñas son diferentes';
// 		Swal.fire({
// 			icon: 'warning',
// 			text: msg,
// 		});
// 		console.log(msg);
// 	} else if (password.length < 6) {
// 		const msg = 'Las Contraseñas debe contener almenos 6 caracteres';
// 		Swal.fire({
// 			icon: 'warning',
// 			text: msg,
// 		});
// 		console.log(msg);
// 	} else {
// 		const body = {
// 			idUsuario: uniqid(),
// 			idRol: '2',
// 			nombres: event.target.nombres.value,
// 			apellidos: event.target.apellidos.value,
// 			email: event.target.email.value,
// 			password: event.target.password.value,
// 		};

// 		console.log(body);
// 		axios
// 			.post(`/OmegaPets/usuario/crear`, body)
// 			.then((res) => {
// 				//console.log(res.data);
// 				const msg = res.data.msg;
// 				console.log(msg);
// 				if (msg === 'El Usuario ya existe') {
// 					Swal.fire({
// 						icon: 'warning',
// 						text: msg,
// 					});
// 				} else {
// 					Swal.fire({
// 						icon: 'success',
// 						text: 'El registro ha sido actualizado con éxito.',
// 					}).then((res) => {
// 						navegar('/');
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	event.preventDefault();
// }
