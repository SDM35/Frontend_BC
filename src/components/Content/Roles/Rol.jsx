import React from 'react'

export const Rol = () => {
    return (
        <React.Fragment>
            <h2 className="mb-4">Gestion de Roles</h2>
            <div className="table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>mark.otto</td>
                            <td>Mark Otto</td>
                            <td>mark.otto@bluecode.com</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>rashfoth.gauss</td>
                            <td>Rashfoth Gauss</td>
                            <td>rashfoth.gauss@bluecode.com</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>kanne.smith</td>
                            <td>Kanne Smith</td>
                            <td>kanne.smith@bluecode.com</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </React.Fragment>
    )
}
