import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import imgFile from "./../../images/folder.png";
import Header from "../componentes/header";
import SideBar from "../componentes/sideBar";
//import ProductosDetalle from '../componentes/productosdetalle';

function ProductosListar() {
  const navegar = useNavigate();

  function productosBorrar(idBorrar) {
    Swal.fire({
      title: "¿Deseas ejecutar esta acción?",
      text: "¡Estas a punto eliminar un registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Registro eliminado!",
          "El registro ha sido eliminado con éxito.",
          "success"
        );
        axios
          .delete(`OmegaPets/producto/borrar/${idBorrar}`)
          .then((res) => {
            navegar(0);
          })
          .catch((err) => console.log(err));
      }
    });
  }

  const [dataProductos, setdataProductos] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

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
  //Peticion GET para listar productos utilizando axios
  useEffect(() => {
    setSelectedImg(imgFile);

    axios
      .get("OmegaPets/producto/listar")
      .then((res) => {
        setdataProductos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        //console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  };
  function handleSubmit(event) {
    Swal.fire({
      title: "¿Deseas ejecutar esta acción?",
      text: "Estas a punto agregar un registro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregalo!",
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
          fechaCreacion: event.target.fecha.value,
          idProducto: dataProductos.length + 1,
        };
        let file = event.target.foto.files[0];
        getBase64(file)
          .then((result) => {
            file["base64"] = result;
            body["foto"] = result;
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(body);
        setTimeout(() => {
          axios
            .post(`/OmegaPets/producto/crear`, body)
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Registro editado!",
                "El registro ha sido agregado con éxito.",
                "success"
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
      }
    });
    event.preventDefault();
  }

  return (
    <div className="wrapper">
      <Header></Header>
      <SideBar></SideBar>
      <div>
        <div className="pcoded-main-container">
          <div className="pcoded-content">
            <div className="container mt-5">
              <div className="row list-product">
                <div className="card">
                  <h5 class="card-header">Crear Producto</h5>
                  <div className="card-body">
                    <div className="col">
                      <form
                        onSubmit={handleSubmit}
                        class="row g-3 needs-validation"
                        novalidate
                      >
                        <div class="col-md-4">
                          <label for="foto" class="form-label">
                            Foto
                          </label>
                          <img className="imgFile" src={selectedImg}></img>

                          <input
                            type="file"
                            class="form-control inputFile"
                            id="foto"
                            onChange={handleChange}
                            required
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-4">
                          <label for="codigo" class="form-label">
                            Código
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="codigo"
                            required
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-4">
                          <label for="categoria" class="form-label">
                            Categoria
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="categoria"
                            required
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-4">
                          <label for="referencia" class="form-label">
                            Referencia
                          </label>
                          <div class="input-group has-validation">
                            <input
                              type="text"
                              class="form-control"
                              id="referencia"
                              aria-describedby="inputGroupPrepend"
                              required
                            />
                            <div class="invalid-feedback">
                              Please choose a username.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="codBarras" class="form-label">
                            Código de barras
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="codBarras"
                            required
                          />
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="nombreProducto" class="form-label">
                            Nombre producto
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="nombreProducto"
                            required
                          />
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="precio" class="form-label">
                            Precio
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="precio"
                            required
                          />
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="estado" class="form-label">
                            Estado
                          </label>

                          <select
                            className="custom-select"
                            id="estado"
                            required
                          >
                            <option value="">Open this select menu</option>
                            <option value="AGOTADO">Agotado</option>
                            <option value="DISPONIBLE">Disponible</option>
                          </select>
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="fecha" class="form-label">
                            Fecha
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="fecha"
                            required
                          />
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="descripcion" class="form-label">
                            Descripción
                          </label>
                          <textarea
                            class="form-control"
                            id="descripcion"
                            placeholder="Required example textarea"
                            required
                          ></textarea>
                          <div class="invalid-feedback">
                            Please enter a message in the textarea.
                          </div>
                        </div>
                        <div class="col-12">
                          <button class="btn btn-primary btn-lg" type="submit">
                            Crear
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row list-product">
                <div className="card">
                  <h5 class="card-header">Lista de Productos</h5>

                  <div className="card-body">
                    <div className="col-md-12">
                      <table className="table table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <td align="center">Id</td>
                            <td align="center">Nombre</td>
                            <td align="center">Precio</td>
                            <td align="center"></td>
                            <td align="center"></td>
                          </tr>
                        </thead>
                        <tbody>
                          {dataProductos.map((miproducto) => (
                            <tr>
                              <td align="center">{miproducto.idProducto}</td>
                              <td align="center">
                                {miproducto.nombreProducto}
                              </td>
                              <td align="center">{miproducto.precio}</td>
                              <td align="center">
                                <Link to={`/productoseditar/${miproducto._id}`}>
                                  <li className="btn btn-success">Editar</li>
                                </Link>
                              </td>
                              <td align="center">
                                <li
                                  className="btn btn-danger"
                                  onClick={() => {
                                    productosBorrar(miproducto._id);
                                  }}
                                >
                                  Borrar
                                </li>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <section className="mt-5 mb-5">
                <div align="center">Copyright (c) 2022 - MisionTIC</div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//<td><img src={`${process.env.PUBLIC_URL}/imagenes/${miproducto.img}`} alt={miproducto.nombre} width="30px" className="img-fluid"/></td>

export default ProductosListar;
