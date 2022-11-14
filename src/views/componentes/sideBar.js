import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './carrusel';
import Header from './header';

const Sidebar = () => {
	return (
		<div>
			<nav className="pcoded-navbar ">
				<div className="navbar-wrapper  ">
					<div className="navbar-content scroll-div ">
						<ul className="nav pcoded-inner-navbar ">
							<li className="nav-item pcoded-menu-caption">
								<label>Menú de navegación</label>
							</li>
							<li className="nav-item">
								<a href="/" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">Inicio</span>
								</a>
							</li>
							<li className="nav-item">
								<a href="/usuarios" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-user"></i>
									</span>
									<span className="pcoded-mtext">
										Usuarios
									</span>
								</a>
							</li>
							<li className="nav-item" >
								<a href="/productos" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">
										Productos
									</span>
								</a>
							</li>
							<li className="nav-item" >
								<a href="/productos-cliente" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">
										Productos - Cliente
									</span>
								</a>
							</li>
							<li className="nav-item" >
								<a href="/carrito" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">
										Productos - Carrito
									</span>
								</a>
							</li>
							<li className="nav-item">
								<a href="facturas" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">
										Facturas
									</span>
								</a>
							</li>
							<li className="nav-item">
								<a href="index.html" className="nav-link ">
									<span className="pcoded-micon">
										<i className="feather icon-home"></i>
									</span>
									<span className="pcoded-mtext">Equipo</span>
								</a>
							</li>
						</ul>

						<div className="card text-center">
							<div className="card text-center">
								<div className="card-block">
									<button
										type="button"
										className="close"
										data-dismiss="alert"
										aria-hidden="true"></button>
									<i className=""></i>
									<h6 className="mt-3">POSIBLE FOTER</h6>
									<p>Gracias por visitar nuestra pagina</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
