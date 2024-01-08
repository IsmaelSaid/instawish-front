import { useState } from "react";

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
        <form onSubmit={handleForm} method="post">
            <div>
                <label htmlFor="inputText">Nom d'utilisateur:</label>
                <input type="text" name="inputText" id="inputText" onChange={(e) => { setUsername(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="inputEmail">Email:</label>
                <input type="email" name="inputEmail" id="inputEmail" onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="inputPassword">Mot de passe:</label>
                <input type="password" name="inputPassword" id="inputPassword" onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="inputFile">Photo de profil</label>
                <input type="file" name="inputFile" id="inputFile" onChange={(e) => { setFile(e.target.files[0]) }} />
            </div>

            <button type="submit">Envoyer</button>
        </form>
    )
}

export default Register;
