import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";
function ProductoDetail() {
  const [dataProducto, setdataProducto] = useState({});
  const params = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    axios
      .get(`/OmegaPets/producto/buscar/${params.id}`)
      .then((res) => {
        console.log(res.data.result);
        setdataProducto(res.data.result);
        //miproducto = res.data.result;
        //console.log(miproducto);
        if (res.data.result.foto) {
          setSelectedFile(res.data.result.foto);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <div className="wrapper">
        <Header></Header>
        <SideBar></SideBar>
        <div>
          <div className="pcoded-main-container">
            <div className="pcoded-content"></div>
            <div className="container mt-5">
              <div className="row list-product">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <img className="imagen" src={selectedFile} alt=""></img>
                      </div>
                      <div className="col-sm-6 compras detail-p">
                        <h6>
                          {" "}
                          <strong> Referencia:</strong>{" "}
                          {dataProducto.referencia}
                        </h6>
                        <br></br>

                        <h4 className="title">{dataProducto.nombreProducto}</h4>
                        <p className={dataProducto.estado}>
                          {dataProducto.estado}
                        </p>
                        <br></br>

                        <h6>
                          {" "}
                          <strong>Categoria:</strong> {dataProducto.categoria}
                        </h6>
                        <h6>
                          {" "}
                          <strong>Descripción: </strong>{" "}
                          {dataProducto.descripcion}
                        </h6>
                        <br></br>
                        <p className="price">
                          {formatter.format(dataProducto.precio)}
                        </p>
                        <br></br>
                        <br></br>
                        <button type="button" class="btn btn-secondary">
                          Agregar al carrito{" "}
                          <span class="material-symbols-outlined">
                            shopping_cart
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetail;
