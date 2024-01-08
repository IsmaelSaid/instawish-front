import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // cf https://uploadcare.com/blog/how-to-upload-file-in-react/
    const [file, setFile] = useState([])


    const handleForm = (e) => {
        // prévenir la soumission automatique
        // C'est à ce niveau que il faudra vérifier la saisie de l'utilisateur

        e.preventDefault();
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("profilePicture", file);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://symfony-instawish.formaterz.fr/api/register", requestOptions)
            .then(response => console.log(response.text()))
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    return (
        <form onSubmit={handleForm} method="post">
            <p>
                <label htmlFor="inputText">username:</label>
                <input type="text" name="inputText" id="inputText" onChange={(e) => { setUsername(e.target.value) }} />
            </p>

            <p>
                <label htmlFor="inputEmail">Email:</label>
                <input type="email" name="inputEmail" id="inputEmail" onChange={(e) => { setEmail(e.target.value) }} />
            </p>

            <p>
                <label htmlFor="inputPassword">Password:</label>
                <input type="password" name="inputPassword" id="inputPassword" onChange={(e) => { setPassword(e.target.value) }} />
            </p>

            <p>
                <label htmlFor="inputFile">Photo</label>
                <input type="file" name="inputFile" id="inputFile" onChange={(e) => { setFile(e.target.files[0]) }} />
            </p>

            <button type="submit">Envoyer</button>
        </form>)
}

export default Register