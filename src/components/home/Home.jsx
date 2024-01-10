import { useEffect, useState } from "react"
import { CardBody, Container, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch('https://symfony-instawish.formaterz.fr/api/home',requestOptions).then((response)=>{
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json()
        }).then((posts)=>{
            /**
             * Stockez tout les posts
             */
            setPosts(posts)
            console.log(posts)
        }).catch((reason)=>{
            /**
             * Traites les erreurs
             */
            console.log('Impossible de récupérer les posts');

        })
    }, [])

    return (
        <Container>
            {Object.entries(posts).map((value)=>{
                const [, { comments, createdBy, description, id, imageUrl }] = value;
                const {email, imageUrl : imageAuthorUrl,username} = createdBy
                return (
                    <Card key={id} className="mt-4"  style={{width : '50%'}}>
                        <Card.Img variant="top" src={`https://symfony-instawish.formaterz.fr/${imageUrl}`} />
                            <CardBody>
                            <Card.Title>
                                <span>
                                    <Image src={`https://symfony-instawish.formaterz.fr/${imageAuthorUrl}`} style={{ width: '50px', height: '50px' }} roundedCircle />
                                    {username}
                                </span>
                            </Card.Title>   
                                <Card.Text>{description}</Card.Text>
                                <div className="d-flex">
                                    <Button value={id} variant="primary" className="mx-2" onClick={()=>{}}>Like</Button>
                                </div>
                            </CardBody>
                    </Card>
                )
            })}
        </Container>
    )
}

export default Home