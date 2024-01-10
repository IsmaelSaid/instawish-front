import { useEffect, useState } from "react";

function ListUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const header = new Headers();
        header.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const requestOptions = {
            method: 'GET',
            headers: header,
        };

        fetch('https://symfony-instawish.formaterz.fr/api/users', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((value) => {
                setUsers(value);
            })
            .catch((reason) => {
                console.log('erreur', reason);
            });
    }, []);

    return (
        <div>
            {Object.entries(users).length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>email</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(users).map((value) => {
                            const [index, { id, email, username }] = value;
                            return (
                                <tr key={id}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Aucune donnée à afficher</p>
            )}
        </div>
    );
}
export default ListUsers