import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

function ListUsers() {
    const [users, setUsers] = useState([]);

    const handlerSubscribe = (e) =>{
        console.log(e.target.value);
        const target = e.target.value

        const header = new Headers()
        header.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const requestOptions = {
            method: 'POST',
            headers: header,
        };

        fetch(`https://symfony-instawish.formaterz.fr/api/follow/add/${target}`,requestOptions).then((response)=>{
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json()
        }).then((value)=>{

            /**
             * L'utilisateur d'id target est suivi
             */
            console.log(`L'utilisateur d'id : ${target} est suivi`)
        }).catch((reason)=>{
            /***
             * L'utilisateur n'a pas pu être suivi
             */
            console.log("L'utilisateur n'a pas pu être suivi")
        })

    }
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
                console.log(value);
                setUsers(value);
            })
            .catch((reason) => {
                console.log('erreur', reason);
            });
    }, []);

    return (
        <Container>
            {Object.entries(users).map((value) => {
                const [, { imageUrl, username, email, id }] = value
                return (
                        <Row className="mt-4" key={id}>
                            <Col>
                                <Image src={`https://symfony-instawish.formaterz.fr/${imageUrl}`} style={{ width: '50px', height: '50px' }} roundedCircle />
                            </Col>
                            <Col>
                                <span>{username}</span> <br />
                                <span>{email}</span>
                            </Col>
                            <Col>
                                <Button value = {id} onClick={handlerSubscribe}>Abonner</Button>
                            </Col>
                        </Row>
                )
            })}
        </Container>
    );
}
export default ListUsers