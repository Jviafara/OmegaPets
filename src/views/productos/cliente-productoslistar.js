import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import imgFile from "./../../images/folder.png";
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";
//import ProductosDetalle from '../componentes/productosdetalle';

function ProductosListarC() {
  const navegar = useNavigate();

  const [dataProductos, setdataProductos] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  //Peticion GET para listar productos utilizando axios
  useEffect(() => {
    setSelectedImg(imgFile);

    axios
      .get("OmegaPets/producto/listar")
      .then((res) => {
        setdataProductos(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wrapper">
    <Header></Header>
    <SideBar></SideBar>
    <div>
      <div className="pcoded-main-container">
        <div className="pcoded-content">
    <div className="container mt-5">
      <div className="row compras">
        <div className="col-md-12">
          <div className="row">
            {dataProductos.map((miproducto) => (
              <div className="col col-md-6 col-xl-4">
                <div className="card">
                  <img src={miproducto.foto}></img>

                  <div className="card-body">
                  <div className="end">
                      {" "}
                      <Link to={`/productosdetail/${miproducto._id}`}>
                      <span class="material-symbols-outlined">visibility</span>
                      </Link>
                      <a>
                     </a>
                    </div>
                    <h3>{miproducto.nombreProducto}</h3>
                    <p className={miproducto.estado}>{miproducto.estado}</p>

                    <p className="price">
                      {formatter.format(miproducto.precio)}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="mt-5 mb-5">
        <div align="center">Copyright (c) 2022 - MisionTIC</div>
      </section>
    </div></div></div></div></div>
  );
}

//<td><img src={`${process.env.PUBLIC_URL}/imagenes/${miproducto.img}`} alt={miproducto.nombre} width="30px" className="img-fluid"/></td>

export default ProductosListarC;
