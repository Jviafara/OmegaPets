import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-5 mb-5">

                <div className="rapper">

                    <b>Version</b> 1.0 😍
                </div>
                <strong>Copyright © 2022 <Link to={"/equipo"}>Equipo</Link></strong> Todos los derechos reservados®.
                <tr></tr>
                <div>Puedes navegar a traves de nuestra pagina usando los siguientes menús cortos.
                    <tr></tr>
                    <Link to={"/inicio"}>Inicio</Link>
                    <tr></tr>
                    <Link to={"/productos"}>Producto</Link>
                    <tr></tr>
                    <Link to={"/usuarios"}>Usuarios</Link>
                    <tr></tr>
                    <Link to={"/facturas"}>Facturas</Link>
                    <section className="mt-5 mb-5">
                        <div align="center">Copyright (c) 2022 - MisionTIC</div>
                    </section>

                </div>
        </footer >


    );
}

export default Footer;