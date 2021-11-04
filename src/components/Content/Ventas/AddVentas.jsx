import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';
import { Switch, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export const AddVentas = () => {

    const auth = useAuth();

    const [idProducto, setIdProducto] = useState([])    
    const [cantidad, setCantidad] = useState([])
    const [idVendedor, setIdVendedor] = useState([])
    const [cc, setCC] = useState([])
    const [cliente, setCliente] = useState([])


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/ventas/new`,
                // headers: {
                //     'Authorization': `Bearer ${auth.token}`
                // }
                data: {
                    idProducto: idProducto,
                    cantidad: cantidad,
                    vendedor: idVendedor,
                    idCliente: cc,
                    nombreCliente: cliente
                }
            });
            console.log(data);

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

    return (
        <React.Fragment>
            <h2 className="mb-4">Agregar Venta</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body"></div>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="producto" class="form-label">Ingrese ID del producto:</label>
                        <input type="text" class="form-control" id="IDProducto" value={idProducto} onChange={(e) => {setIdProducto(e.target.value);}}/>
                    </div>
                    <div class="mb-3">
                        <label for="valor" class="form-label">Producto seleccionado:</label>
                        <input type="text" class="form-control" id="productoSeleccionado" disabled />
                    </div>
                    <div class="col-md-4">
                        <label for="cantidad" class="form-label">Seleccione cantidad:</label>
                        <input type="number" class="form-control" id="cantidad" value={cantidad} onChange={(e) => {setCantidad(e.target.value);}}/>
                    </div>

                    <div class="mb-3">
                        <label for="vendedor" class="form-label">Ingrese ID del vendedor:</label>
                        <input type="text" class="form-control" id="IDVendedor" value={idVendedor} onChange={(e) => {setIdVendedor(e.target.value);}}/>
                    </div>
                    <div class="mb-3">
                        <label for="nombreVendedor" class="form-label">Nombre del vendedor:</label>
                        <input type="text" class="form-control" id="nombreVendedor" disabled />
                    </div>

                    <div class="mb-3">
                        <label for="fecha" class="form-label">Fecha de la venta:</label>
                        <input type="date" class="form-control" id="fechaVenta" />
                    </div>
                    
                    <div class="form-check">
                        <label for="estado" class="form-label">Seleccione estado de la venta:</label>
                        <br />
                        <input class="form-check-input" type="radio" name="estado" id="enProceso" />
                        <label class="form-check-label" for="enProceso">
                            En proceso
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="estado" id="entregada" checked />
                        <label class="form-check-label" for="entregada">
                            Entregada
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="estado" id="cancelada" checked />
                        <label class="form-check-label" for="cancelada">
                            Cancelada
                        </label>
                    </div>
                    <br />

                    <div class="mb-3">
                        <label for="cc" class="form-label">C.C Cliente:</label>
                        <input type="text" class="form-control" id="IDCliente" value={cc} onChange={(e) => {setCC(e.target.value);}}/>
                    </div>
                    <div class="mb-3">
                        <label for="cliente" class="form-label">Nombres y apellidos del cliente:</label>
                        <input type="text" class="form-control" id="nombreCLiente" value={cliente} onChange={(e) => {setCliente(e.target.value);}}/>
                    </div>
                    <br />

                    <button type="submit" class="btn btn-primary">Confirmar Venta</button>
                    <br /> <br />
                    <button type="submit" class="btn btn-primary">Cancelar</button>

                </form>
            </div>

        </React.Fragment>
    )
}