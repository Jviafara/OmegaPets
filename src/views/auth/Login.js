import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
	const navegar = useNavigate();
	//definimos el estado inicial de las variables
	const [usuario, setUsuario] = useState({
		email: '',
		password: '',
	});

	const { email, password } = usuario;

	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		document.getElementById('email').focus();
	}, []);

	const iniciarSesion = async () => {
		if (password.length < 6) {
			const msg = 'La contraseña debe ser al menos de 6 caracteres.';
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
				email: usuario.email,
				password: usuario.password,
			};
			console.log(body);
			axios
				.post(`/OmegaPets/login/autentificar`, body)
				.then((res) => {
					console.log(res);
					const mensaje = res.data.msg;
					if (
						mensaje === 'El usuario no existe' ||
						mensaje === 'Contraseña incorrecta'
					) {
						const msg =
							'No fue posible iniciar la sesión verifique los datos ingresados.';
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
						//obtenemos el token de acceso jwt
						const jwt = res.data.token;

						//guardamos el token en el localstorage
						localStorage.setItem('token', jwt);
						function parseJwt(token) {
							if (!token) {
								return;
							}
							const base64Url = token.split('.')[1];
							const base64 = base64Url
								.replace('-', '+')
								.replace('_', '/');
							return JSON.parse(window.atob(base64));
						}
						const currenUser = parseJwt(jwt);
						localStorage.setItem('UserId', currenUser.usuario.id);

						//redireccionamos al home la pagina principal
						navegar('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	function handleSubmit(event) {
		iniciarSesion();
		event.preventDefault();
	}

	return (
		<div className="auth-wrapper">
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
					<div class="row align-items-center ">
						<div class="col-md-12">
							<div class="card-body">
								<h4 class="mb-3 f-w-400">Log In</h4>
								<hr></hr>
								<form
									onSubmit={handleSubmit}
									class="needs-validation">
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
											placeholder="Password"
											name="password"
											value={password}
											onChange={onChange}
										/>
									</div>
									<button
										type="submit"
										class="btn btn-block btn-primary mb-4">
										Log In
									</button>
									<hr />
									<p class="mb-2 text-muted">
										Olvidó su contraseña?{'  '}
										<a
											href="auth-reset-password.html"
											class="f-w-400">
											Restablecer
										</a>
									</p>
									<p class="mb-2 text-muted">
										Aún no tienes una cuenta?{'   '}
										<a href="/registrar" class="f-w-400">
											Sign Up
										</a>
									</p>
									<a href="/" class="f-w-400">
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

export default Login;
