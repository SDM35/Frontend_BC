import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { getUsres } from '../../../services/Users.service';
import swal from 'sweetalert';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const User = () => {

    const auth = useAuth();

    const [users, setusers] = useState([])

    const getUsers = async () => {
        try {
            const { status, data } = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/ciclo3/user/list',
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            setusers(data.data);

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

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <React.Fragment>
            <h2 className="mb-4">Gestion de Usuarios</h2>
            <div className="table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.user}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol.name}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                            <NavLink className="badge badge-info" exact to={`/home/EditUser/${user._id}`}>
                                                Actualizar
                                            </NavLink>
                                            <NavLink className="badge badge-danger ml-4" exact to="/home/EditUser">
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
