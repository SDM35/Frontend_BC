import React from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router';
import { loginGoogle } from '../../services/Auth.service';
import '../../css/login.scss';
import swal from 'sweetalert';



export const Login = () => {

    const history = useHistory();
    const auth = useAuth();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        auth.setToken('');
        auth.setUser({ id: 1, username: '' });
        history.push('/home/User');

    }

    const responseGoogle = async (resp) => {

        try {
            const { status, data } = await axios({
                method: 'POST',
                url: 'http://localhost:4000/api/ciclo3/auth/google/login',
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${resp.tokenId}`
                }
            });

            console.log('status', status);
            console.log('data', data);

            if (status === 200) {

                auth.setToken(data.token);
                auth.setUser({ uid: data.uid, name: data.name });
                history.push('/home');

            } else if (status === 201) {
                swal({
                    title: "Registro exitoso",
                    text: data.msg,
                    icon: "success",
                    dangerMode: true,
                    confirmButtonText: 'OK'
                })
            }

        } catch (error) {
            /* console.log(error, 123);
            console.log(error.toJSON());
            console.log(error.response.status);
            console.log(error.response.data); */

            console.log(error);
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
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card" id="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>

                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        name="lEmail"
                                        value={lEmail}
                                        onChange={handleLoginInputChange}
                                    />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="lPassword"
                                        value={lPassword}
                                        onChange={handleLoginInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Copyright &copy; 2021 {'\n'} All rights reserved | Blue-Code <i className="icon-heart" aria-hidden="true"></i>
                            </div>
                        </div>
                        <GoogleLogin
                            className="btn form-group"
                            clientId={process.env.REACT_APP_IDOAUTH}
                            buttonText="Iniciar sesion con google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
