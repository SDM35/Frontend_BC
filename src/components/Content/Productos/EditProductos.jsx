import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export const EditProductos = () => {

    const auth = useAuth();

    const { id } = useParams();
    console.log("ID", id);

    const [productos, setProductos] = useState({})

    const [nombre, setNombre] = useState("")    
    const [valor, setValor] = useState(0)
    const [estado, setEstado] = useState(0)


    const getProductos = async () => {
        
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/product/`+ id,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                // headers: {
                //     'Authorization': `Bearer ${auth.token}`
                // }
            });
            console.log(data.data);
            setProductos(data.data);

            setNombre(data.nombre);
            setValor(data.valor);
            setEstado(data.estado);
            
            console.log("Productos", data.nombre);

        } catch (error) {
            // if (error.response.status === 401) {
            //     swal({
            //         title: 'Error',
            //         text: error.response.data.msg,
            //         icon: 'error',
            //         confirmButtonText: 'OK'
            //     });
            // } else {
            //     swal({
            //         title: 'Error',
            //         text: error.response.data.msg,
            //         icon: 'error',
            //         confirmButtonText: 'OK'
            //     });
            // }
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API_URL}/product/`+ id,
            /* url: `${process.env.EndpointApi}/auth/google/login`, */
            // headers: {
            //     'Authorization': `Bearer ${auth.token}`
            // }
            data: {
                nombre: nombre,
                valor: valor,
                estado: estado
            }
        });
        console.log(data);
    }

    useEffect(() => {
        getProductos();
    }, []);

    return (
        <React.Fragment>
            <h2 className="mb-4">Editar Producto</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body"></div>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="producto" class="form-label">Nombre del producto:</label>
                        <input type="text" class="form-control" id="nombreProducto" value={productos.nombre} onChange={(e) => {setNombre(e.target.value);}}/>
                    </div>

                    <div class="mb-3">
                        <label for="valor" class="form-label">Valor unitario:</label>
                        <input type="text" class="form-control" id="valorUnitario" value={productos.valor} onChange={(e) => {setValor(e.target.value);}}/>
                    </div>

                    <div class="form-check">
                        <label for="estado" class="form-label">Seleccione estado del producto:</label>
                        <br />
                        <input class="form-check-input" type="radio" name="estado" id="disponible" />
                        <label class="form-check-label" for="disponible">
                            Disponible
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="estado" id="noDisponible" checked />
                        <label class="form-check-label" for="noDisponible">
                            No disponible
                        </label>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Actualizar Producto</button>
                    <br /> <br />
                    <button type="submit" class="btn btn-primary">Cancelar</button>

                </form>
            </div>

        </React.Fragment>
    )
}