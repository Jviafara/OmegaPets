import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Carrusel = () => {
	return (
		<div>
			<div className="pcoded-main-container">
				<div className="pcoded-content">
					<div className="col-sm-8">
						<div className="card">
							<div className="card-header">
								<h5>Conoce nuestros principales productos</h5>
							</div>
							<div className="card-body">
								<div
									id="carouselExampleIndicatorscaption"
									className="carousel slide"
									data-ride="carousel">
									<ol className="carousel-indicators">
										<li
											data-target="#carouselExampleIndicators"
											data-slide-to="0"
											className="active"></li>
										<li
											data-target="#carouselExampleIndicators"
											data-slide-to="1"></li>
										<li
											data-target="#carouselExampleIndicators"
											data-slide-to="2"></li>
									</ol>
									<div className="carousel-inner">
										<div className="carousel-item active">
											<img
												className="img-fluid d-block w-100"
												src="assets\images\mujer_perro.jpg"
												alt="First slide"></img>
											<div className="carousel-caption d-none d-md-block">
												<h5 className="text-white">
													Ropa para perros
												</h5>
												<p>Encuentra prendas a la medida para tu mascota.</p>
											</div>
										</div>
										<div className="carousel-item">
											<img
												className="img-fluid d-block w-100"
												src="assets\images\perro_corbata.jpg"
												alt="Second slide"></img>
											<div className="carousel-caption d-none d-md-block">
												<h5 className="text-white">
													Productos de aseo
												</h5>
												<p>
													Cepillos especiales para cada mascota.
												</p>
											</div>
										</div>
										<div className="carousel-item">
											<img
												className="img-fluid d-block w-100"
												src="assets\images\perro_gato.jpg"
												alt="Third slide"></img>
											<div className="carousel-caption d-none d-md-block">
												<h5 className="text-white">
													Productos alimenticios
												</h5>
												<p>
													Variedad de concentrados y suplementos.
												</p>
											</div>
										</div>
									</div>
									<a
										className="carousel-control-prev"
										href="#carouselExampleIndicatorscaption"
										role="button"
										data-slide="prev">
										<span
											className="carousel-control-prev-icon"
											aria-hidden="true"></span>
										<span className="sr-only">
											Previous
										</span>
									</a>
									<a
										className="carousel-control-next"
										href="#carouselExampleIndicatorscaption"
										role="button"
										data-slide="next">
										<span
											className="carousel-control-next-icon"
											aria-hidden="true"></span>
										<span className="sr-only">Next</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carrusel;
