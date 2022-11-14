import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	var autentificaion = '';
	var url = '';
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('UserId');

	if (!token) {
		autentificaion = 'Sign In';
		url = '/login';
	} else {
		autentificaion = 'Sign Out';
		url = '/';
	}

	function logout() {
		if (token) {
			localStorage.removeItem('token');
			localStorage.removeItem('UserId');
		}
	}

	return (
		<div>
			<header className="navbar pcoded-header navbar-expand-lg navbar-light header-dark">
				<div className="m-header">
					<a className="mobile-menu" id="mobile-collapse" href="#!">
						<span></span>
					</a>
					<a href="/" className="b-brand">
						<img
							src="/Logotipo/omegaPet_logo_horizontal2.png"
							alt=""
							className="logo"
							height={50}
							width={100}
						/>
						<img
							src="/"
							alt=""
							className="logo-thumb"
							height={50}
							width={50}
						/>
					</a>
					<a href="#!" className="mob-toggler">
						<i className="feather icon-more-vertical"></i>
					</a>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<h1 className="text-white">Omega Pet Shop</h1>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li></li>
						<li>
							<div className="dropdown drp-user">
								<a
									href="#!"
									className="dropdown-toggle"
									data-toggle="dropdown">
									<i className="feather icon-user"></i>
								</a>
								<div className="dropdown-menu dropdown-menu-right profile-notification">
									<ul className="pro-body">
										<Link to={`/profile/${id}`}>
											<li>
												<a className="dropdown-item">
													<i className="feather icon-user"></i>{' '}
													Profile
												</a>
											</li>
										</Link>

										<li>
											<a
												onClick={logout}
												href={url}
												className="dropdown-item">
												<i className="feather icon-user"></i>
												{autentificaion}
											</a>
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Header;
