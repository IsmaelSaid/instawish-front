import { useEffect, useState } from "react"
import { CardBody, Container, Button, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function MyPosts() {
    const id = localStorage.getItem('id')
    const [posts, setPosts] = useState([])
    useEffect(() => {
        var headers = new Headers()
        headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        fetch(`https://symfony-instawish.formaterz.fr/api/home/${id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json()
        }).then((posts) => {
            console.log(posts)
            setPosts(posts)
        }).catch((reason) => {
            /**
             * Traitez erreur
             */
        })

    }, [])
    return (
        <Container>
            <div>
                {Object.entries(posts).map((value, index) => {
                    const [, { imageUrl, description }] = value
                    return (
                        <Card key={index} className="mt-4">
                            <CardBody>
                                <Card.Img variant="top" src={`https://symfony-instawish.formaterz.fr/${imageUrl}`} />
                                <Card.Text>{description}</Card.Text>
                                <div className="d-flex">
                                    <Button variant="primary" className="mx-2">Supprimer</Button>
                                </div>
                            </CardBody>
                        </Card>)
                })}
            </div>

        </Container>
    )

}

export default MyPosts