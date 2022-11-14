import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import imgFile from "./../../images/folder.png";
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";
function ProductosDetalle({ miproducto }) {
  const [dataProducto, setdataProducto] = useState({});
  const params = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  let getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      if (file !== undefined) {
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          //console.log("Called", reader);
          baseURL = reader.result;
          // console.log(baseURL);
          resolve(baseURL);
        };
      }
      //console.log(fileInfo);
    });
  };

  function handleChange(event) {
    let file = event.target.files[0];
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setSelectedImg(result);
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSubmit(event) {
    Swal.fire({
      title: "¿Deseas ejecutar esta acción?",
      text: "Estas a punto editar un registro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          codigo: event.target.codigo.value,
          categoria: event.target.categoria.value,
          referencia: event.target.referencia.value,
          codBarras: event.target.codBarras.value,
          nombreProducto: event.target.nombreProducto.value,
          descripcion: event.target.descripcion.value,
          precio: event.target.precio.value,
          estado: event.target.estado.value,
        };
        let file = event.target.foto.files[0];
        getBase64(file)
          .then((result) => {
            file["base64"] = result;
            body["foto"] = result;
            // console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(body);
        setTimeout(() => {
          axios
            .put(`/OmegaPets/producto/editar/${params.id}`, body)
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Registro editado!",
                "El registro ha sido actualizado con éxito.",
                "success"
              );
            })
            .catch((err) => {
              Swal.fire("Error", "Lo sentimos ha ocurrido un error", "error");
              console.log(err);
            });
        }, 1000);
      }
    });
    event.preventDefault();
  }
  useEffect(() => {
    setSelectedImg(imgFile);
    axios
      .get(`/OmegaPets/producto/buscar/${params.id}`)
      .then((res) => {
        //console.log(res.data.result);
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
                  <h5 className="card-header">{dataProducto.nombreProducto}</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <img className="imagen" src={selectedFile} alt=""></img>
                      </div>
                      <div className="col-sm-6">
                        <form
                          onSubmit={handleSubmit}
                          className="row g-3 needs-validation"
                          noValidate
                        >
                          <div className="col-md-4">
                            <label htmlFor="foto" className="form-label">
                              Foto
                            </label>
                            <img className="imgFile" src={selectedImg}></img>

                            <input
                              type="file"
                              className="form-control inputFile"
                              id="foto"
                              onChange={handleChange}
                              defaultValue={dataProducto.foto}
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="codigo" className="form-label">
                              Código
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="codigo"
                              defaultValue={dataProducto.codigo}
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="categoria" className="form-label">
                              Categoria
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="categoria"
                              defaultValue={dataProducto.categoria}
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="referencia" className="form-label">
                              Referencia
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={dataProducto.referencia}
                                id="referencia"
                                aria-describedby="inputGroupPrepend"
                                required
                              />
                              <div className="invalid-feedback">
                                Please choose a username.
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="codBarras" className="form-label">
                              Código de barras
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={dataProducto.codBarras}
                              id="codBarras"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="nombreProducto"
                              className="form-label"
                            >
                              Nombre producto
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={dataProducto.nombreProducto}
                              id="nombreProducto"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="precio" className="form-label">
                              Precio
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={dataProducto.precio}
                              id="precio"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="estado" className="form-label">
                              Estado
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={dataProducto.estado}
                              id="estado"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="fecha" className="form-label">
                              Fecha
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={dataProducto.fechaCreacion}
                              id="fecha"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">
                              Descripción
                            </label>
                            <textarea
                              className="form-control"
                              defaultValue={dataProducto.descripcion}
                              id="descripcion"
                              placeholder="Required example textarea"
                              required
                            ></textarea>
                            <div className="invalid-feedback">
                              Please enter a message in the textarea.
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary" type="submit">
                              Actualizar
                            </button>
                          </div>
                        </form>
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

export default ProductosDetalle;
