import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function Login() {
    /**
     * Cherche une possibilité de mutualiser certains états ou parties des formulaires ?
     * L'État du nom d'utilisateur renseigné.
     * @type{string} 
     * 
     */
    const [username, setUsername] = useState('')


    /**
     * L'État du mot de passe renseigné
     * @type{string} 
     */
    const [password, setPassword] = useState('')

    /**
     * loginErr indique si oui ou non une erreur survient lors du login de l'utilisateur
     * État du loginE
     * @type(boolean)
     */
    const [loginErr, setLoginErr] = useState(false)

    const handleForm = (e) => {
        e.preventDefault()

        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
         * @see https://developer.mozilla.org/fr/docs/Web/API/fetch
         * @see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
         */

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch("https://symfony-instawish.formaterz.fr/api/login_check", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text()
        }).then((token) => {

            // Récupérons la valeur du token uniquement et stockons la.
            let tokenObject = JSON.parse(token)
            localStorage.setItem("token", tokenObject.token)

            // Récupérons l'user id aussi
            console.log("connexion réussit");
            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

            var requestOptions = {
              method: 'GET',
              headers: myHeaders
          };

          fetch("https://symfony-instawish.formaterz.fr/api/me",requestOptions).then((response)=>{
            /**
             * Traiter les erreurs...
             */
            if (!response.ok){
              throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json()

          }).then((value)=>{
            /**
             * Stockez les informations de l'utilisateur
             */
            const {imageUrl, id, email, username} = value
            localStorage.setItem("imageUrl", imageUrl)
            localStorage.setItem("id", id)
            localStorage.setItem("email", email)
            localStorage.setItem("username", username)

          }).catch((reason)=>{
            /**
             * Traitez l'erreur. 
             */
          })

        }).catch((reason) => {
            setLoginErr(true)
        })

    }
    /**
     * @see https://react-bootstrap.netlify.app/docs/layout/grid
     */
    return (
        <Container  style={{ width: 'fit-content' }}>
          <form onSubmit={handleForm} method="post" className="border rounded p-3" >
            <Row className="justify-content-md-center">
              <h1 className="text-center">Instawish</h1>
            </Row>
      
            <Row className="mt-4">
              <div>
                <Form.Control type="text" name="inputText" placeholder="Nom utilisateur" onChange={(e) => setUsername(e.target.value)} style={{ fontSize: '0.8rem' }} />
              </div>
            </Row>
      
            <Row className="mt-4">
              <div>
                <Form.Control type="password" name="inputPassword" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '0.8rem' }} />
              </div>
            </Row>
      
            {loginErr && <p>Une erreur est survenue</p>}
      
            <div className="text-center mt-4">
              <Button variant="primary" type="submit">Se connecter</Button>
            </div>
          </form>
        </Container>
      );
      
      
      
      
}

export default Login