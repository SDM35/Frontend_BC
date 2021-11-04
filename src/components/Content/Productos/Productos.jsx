import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';
import { Switch, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export const Productos = () => {

    const auth = useAuth();

    useEffect(() => {
        getProductos();
    }, []);

    const [productos, setProductos] = useState([])

    const getProductos = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/product/`,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                // headers: {
                //     'Authorization': `Bearer ${auth.token}`
                // }
            });
            console.log(data);
            setProductos(data.product);

        } catch (error) {
            if (error.response.status === 401) {
                swal({
                    title: 'Error',
                    text: error.response.data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                swal({
                    title: 'Error',
                    text: error.response.data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    return (
        <React.Fragment>
            <h2 className="mb-4">Gestion de Productos</h2>

            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <NavLink class="badge badge-info" exact to="/home/AddProductos">
                    Agregar Producto
                </NavLink>

            </div>
            <div className="table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Valor Unitario</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((producto, index) => (
                                <tr key={producto._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.valor}</td>
                                    <td>{producto.estado ? "Disponible" : "No disponible"}</td>
                                    <td>
                                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                            <NavLink class="badge badge-info" exact to={`/home/EditProductos/${producto._id}`}>
                                                Actualizar
                                            </NavLink>
                                            <NavLink class="badge badge-danger ml-4" exact to="/home/EditProductos">
                                                Eliminar
                                            </NavLink>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </React.Fragment>
    )
}