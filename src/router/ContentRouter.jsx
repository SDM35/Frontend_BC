import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../css/home.scss';
import { User } from '../components/Content/Users/User';
import { EditUser } from '../components/Content/Users/EditUser';
import { Rol } from '../components/Content/Roles/Rol';
import { Menu } from '../components/Menu/Menu';
import Logo from '../images/logo.jpg';
import { Productos } from "../components/Content/Productos/Productos";
import { Ventas } from "../components/Content/Ventas/Ventas";
import { AddProductos } from "../components/Content/Productos/AddProductos";
import { EditProductos } from "../components/Content/Productos/EditProductos";
import { AddVentas } from "../components/Content/Ventas/AddVentas";
import { EditVentas } from "../components/Content/Ventas/EditVentas";

export const ContentRouter = () => {

    return (
        <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar">
                <div className="p-4 pt-5">
                    <a href="#">
                        <img className="img logo rounded-circle mb-5" src={Logo} />
                    </a>
                    <ul className="list-unstyled components mb-5">
                        <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to="/home/Ventas">
                                Gestión de Ventas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/home/Productos">
                                Gestión de Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Gestion de Usuarios y Roles</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu">
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to="/home/User">
                                        Usuarios
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" exact to="/home/Rol">
                                        Roles
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="footer">
                        <p>
                            Copyright &copy; 2021 {'\n'} All rights reserved | Blue-Code <i className="icon-heart" aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div id="content" className="p-4 p-md-5">
                <Menu />
                <Switch>
                    <Route exact path="/home/Ventas" component={Ventas} />
                    <Route exact path="/home/AddVentas" component={AddVentas} />
                    <Route exact path="/home/EditVentas" component={EditVentas} />
                    <Route exact path="/home/Productos" component={Productos} />
                    <Route exact path="/home/AddProductos" component={AddProductos} />
                    <Route exact path="/home/EditProductos/:id" component={EditProductos} />
                    <Route exact path="/home/User" component={User} />
                    <Route exact path="/home/Rol" component={Rol} />
                    <Route exact path="/home/EditUser/:id" component={EditUser} />
                </Switch>
            </div>
        </div>
    )
}