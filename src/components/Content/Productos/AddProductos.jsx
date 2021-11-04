import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';
import { Switch, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';

export const AddProductos = () => {

    const auth = useAuth();

    const [nombre, setNombre] = useState([])    
    const [valor, setValor] = useState([])
    const [estado, setEstado] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/product/new`,
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
            <h2 className="mb-4">Agregar Producto</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body"></div>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="producto" class="form-label">Nombre del producto:</label>
                        <input type="text" class="form-control" id="nombreProducto" value={nombre} onChange={(e) => {setNombre(e.target.value);}} />
                    </div>

                    <div class="mb-3">
                        <label for="valor" class="form-label">Valor unitario:</label>
                        <input type="text" class="form-control" id="valorUnitario" placeholder="$" value={valor} onChange={(e) => {setValor(e.target.value);}} />
                    </div>

                    <div class="form-check">
                        <label for="estado" class="form-label">Seleccione estado del producto:</label>
                        {/* <input type="text" class="form-control" id="estado" placeholder="Estado" value={estado} onChange={(e) => {setEstado(e.target.value);}} /> */}
                        <br />
                        <input class="form-check-input" type="radio" name="estado" id="disponible" value="1" onChange={(e) => {setEstado(e.target.value);}}/>
                        <label class="form-check-label" for="disponible">
                            Disponible
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="estado" id="noDisponible" value="0" onChange={(e) => {setEstado(e.target.value);}}/>
                        <label class="form-check-label" for="noDisponible">
                            No disponible
                        </label>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Crear Producto</button>
                    <br /> <br />
                    <button type="submit" class="btn btn-primary">Cancelar</button>

                </form>
            </div>

        </React.Fragment>
    )
}