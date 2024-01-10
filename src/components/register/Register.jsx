import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/**
 * Composant de formulaire d'inscription.
 * 
 */
function Register() {
    /**
     * État du nom d'utilisateur.
     * @type {string}
     */
    const [username, setUsername] = useState('');

    /**
     * État de l'adresse e-mail.
     * @type {string}
     */
    const [email, setEmail] = useState('');

    /**
     * État du mot de passe.
     * @type {string}
     */
    const [password, setPassword] = useState('');

    /**
     * État du fichier de la photo de profil.
     * @type {File[]}
     * @see https://uploadcare.com/blog/how-to-upload-file-in-react/
     */
    const [file, setFile] = useState([]);

    /**
     * Gère la soumission du formulaire.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
     */
    const handleForm = (e) => {
        // Prévenir la soumission automatique
        e.preventDefault();

        // Création de FormData avec les données du formulaire
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("profilePicture", file);

        // Options de la requête
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        // Envoi de la requête d'inscription
        fetch("https://symfony-instawish.formaterz.fr/api/register", requestOptions)
            .then(response => console.log(response.text()))
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <Container style={{ width: 'fit-content' }} className="border rounded p-3">

            <form onSubmit={handleForm} method="post">
                <Row className="mt-4">
                    <div>
                        <Form.Control type="text" name="inputText" placeholder="Nom utilisateur" onChange={(e) => setUsername(e.target.value)} style={{ fontSize: '0.8rem' }} />
                    </div>
                </Row>
                <Row className="mt-4">
                    <div>
                        <Form.Control type="email" name="inputPassword" placeholder="exemple@mail.com" onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '0.8rem' }} />
                    </div>
                </Row>
                <Row className="mt-4">
                    <div>
                        <Form.Control type="password" name="inputPassword" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '0.8rem' }} />
                    </div>
                </Row>

                <div className="mt-4">
                    {/* <label htmlFor="inputFile">Photo de profil</label> */}
                    <Form.Control type="file" name="inputFile" id="inputFile" onChange={(e) => { setFile(e.target.files[0]) }} />
                </div>

                <div className="text-center mt-4">
                    <Button variant="primary" type="submit">Créer un compte</Button>
                </div>
            </form>
        </Container>
    )
}

export default Register;
