import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carrusel from '../views/componentes/carrusel';
import Header from '../views/componentes/header';
import SideBar from '../views/componentes/sideBar';

const Home = () => {
	const [dataUsuarios, setdataUsuarios] = useState([]);
	const token = localStorage.getItem('token');
	let bearer;
	if (token === '') {
		bearer = '';
	} else {
		bearer = `${token}`;
	}

	useEffect(() => {
		const config = {
			headers: { 'x-auth-token': bearer },
		};
		console.log(config.headers);
		axios
			.get('OmegaPets/usuario/listar', config)
			.then((res) => {
				console.log(res.data.result);
				setdataUsuarios(res.data.result);
			})
			.catch((err) => console.log(err));
	}, [bearer]);

	return (
		<div className="wrapper">
			<SideBar></SideBar>
			<Header></Header>
			<Carrusel></Carrusel>
		</div>
	);
};

export default Home;
