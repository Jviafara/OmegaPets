import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FacturasListar from "./facturaslistar";
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";


function Facturadetalle({ mifactura }) {

  const [facturaUsuario, setfacturaUsuario] = useState([]);
  const [dataFactura, setdataFactura] = useState({});
  const [totalCompra, settotalCompra] = useState(0);
  const params = useParams();






  useEffect(() => {
    axios
      .get(`/OmegaPets/factura/facturausuariocarrito/${params.id}`)
      .then((res) => {
        console.log(res.data.facturaUsuario.nombres);
        setdataFactura(res.data);
        var total = 0;
        /* dataFactura.facturaCarrito.foreach(el=>{
          total=total+el.totalCompra;
        });

        console.log(total) */

        res.data?.facturaCarrito.forEach(element => {
          total = total + element.totalCompra;

        });

        console.log(res.data.facturaCarrito)
        settotalCompra(total)





      })
      .catch((err) => {
        console.log(err);
      });
  }, {})
  /* const factura = setdataFactura[0]
  console.log("factura",factura)
  const setestado= factura?.estado;
  console.log("estado",setestado) */
  return (

    <div className="wrapper">
      <Header></Header>
      <SideBar></SideBar>
      <div>
        <div className="pcoded-main-container">
          <div className="pcoded-content">
            <div className="container">
              <div className="card">
                <div className="card-body">



                  <form className="row"

                  >
                    <div className="col-md-4">
                      <label for="IdFactura" className="form-label">
                        Id
                      </label>
                      <p><b>{dataFactura?.idFactura}</b></p>
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4">
                      <label for="codigo" className="form-label">
                        fecha Factura
                      </label>
                      <p><b>{dataFactura?.fechaFactura}</b></p>
                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4">
                      <label for="categoria" className="form-label">
                        Nombres
                      </label>
                      <p><b>{dataFactura.facturaUsuario?.nombres}</b></p>

                      <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-4">
                      <label for="referencia" className="form-label">
                        Apellidos
                      </label>
                      <div className="input-group has-validation">
                        <p><b>{dataFactura?.facturaUsuario?.apellidos}</b></p>
                        <div className="invalid-feedback">Please choose a username.</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label for="codBarras" className="form-label">
                        Email
                      </label>
                      <p><b>{dataFactura?.facturaUsuario?.email}</b></p>

                    </div>
                    <div className="col-md-6">
                      <label for="nombreProducto" className="form-label">
                        Estado
                      </label>
                      <p>{dataFactura?.estado}</p>
                      <p><b>Pago realizado</b></p>
                      <div className="invalid-feedback">Please provide a valid city.</div>
                    </div>
                    <div className="col-md-6">
                      <label for="precio" className="form-label">
                        Total Compra

                      </label>
                      <p><b>{totalCompra}</b></p>

                      <div className="invalid-feedback">Please provide a valid city.</div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}










export default Facturadetalle
