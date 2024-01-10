import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function AddPost() {
    /**
     * État associé à la description poste.
     * @type(string)
    */
    const [description, setDescription] = useState('');

    /**
     * État associé au fichier photo du poste.
     * @type {File[]}
     * @see https://uploadcare.com/blog/how-to-upload-file-in-react/
     */
    const [file, setFile] = useState([]);

    /**
     * État associé à la présence ou non d'une erreur lorsque l'utilisateur envoie un post.
     * @type(boolean)
     */
    const [errAddPost, setErrAddPost] = useState(false)

    /**
     * Gère la soumission du formulaire.
     * @param {React.FormEventHandler<HTMLFormElement>} e - l'évenement associé à la soumission du formulaire 
     */
    const handleForm = (e) => {
        e.preventDefault()

        var header = new Headers()
        header.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        // console.log(`Bearer ${localStorage.getItem('token')}`)

        var formdata = new FormData()
        formdata.append('description', description)
        formdata.append('picture', file)

        var requestOptions = {
            method: 'POST',
            headers: header,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://symfony-instawish.formaterz.fr/api/post/add", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text()
        }).then((value) => {
            /***
             *  Réaliser un traitement en cas de requête reussite...
             */
            console.log("ajout réussi")
        }).catch((reason) => {
            /**
             * Réaliser un traitement en cas de requête non réussite...
             */
            setErrAddPost(true)
        })

    }

    return (
        <Container style={{ width: 'fit-content' }}>
            <form onSubmit={handleForm}>
                <Row className = "mt-4">
                    <div>
                        {/* <label htmlFor="inputDescription">Description</label> */}
                        <Form.Control type="text" name="inputDescription" placeholder="Ajouter une photo" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                </Row>
                <Row className = "mt-4">
                    <div>
                        {/* <label htmlFor="inputFile">Choisir une image</label> */}
                        <Form.Control type="file" name="inputFile" onChange={(e) => { setFile(e.target.files[0]) }} />
                    </div>
                </Row>
                {errAddPost ? <p>Une erreur est survenu</p> : null}
                <div className="text-center mt-4">
                    <Button variant="primary" type="submit">Poster</Button>
                </div>
            </form>
        </Container>
    )


}

export default AddPost