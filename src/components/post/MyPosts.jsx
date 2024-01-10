import { useEffect, useState } from "react"
import { CardBody, Container, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function MyPosts() {
    const handleDelete = (e) => {
        // console.log("demande de suppression")
        const header = new Headers()
        header.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const requestOptions = {
            method: 'POST',
            headers: header,
        };

        const target = e.target.value
        fetch(`https://symfony-instawish.formaterz.fr/api/post/remove/${target}`, requestOptions).then((response) => {
            if (!response.ok) {
                /**
                 * 
                 */
                throw new Error(`HTTP error: ${response.status}`);

            }
            return response.ok
        }).then((value) => {
            /**
             * Pas d'effets...
             */
            
            console.log(`Suppression de ${target} réussit`);
            // Déclenchez set post pour activer une maj du dom
            setPosts(posts.filter((post) => post.id != target))
        }).catch((reason) => {
            /**
             * Traitement des erreurs
            */
            console.log(`Suppression de ${target} échouée`);
        })
    }
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
            {posts.length > 0 ? (<div>
                {Object.entries(posts).map((value, index) => {
                    const [, { id, imageUrl, description }] = value
                    return (
                        <Card key={index} className="mt-4">
                            <CardBody>
                                <Card.Img variant="top" src={`https://symfony-instawish.formaterz.fr/${imageUrl}`} />
                                <Card.Text>{description}</Card.Text>
                                <div className="d-flex">
                                    <Button value={id} variant="primary" className="mx-2" onClick={handleDelete}>Supprimer</Button>
                                </div>
                            </CardBody>
                        </Card>)
                })}
            </div>) : <p>Aucun post</p>}
        </Container>
    )
}
export default MyPosts