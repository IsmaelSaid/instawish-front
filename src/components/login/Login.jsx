import { useState } from "react"

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

        }).catch((reason) => {
            setLoginErr(true)
        })

    }
    return (
        <form onSubmit={handleForm} method="post">
            <div>
                <label htmlFor="inputText">Nom d'utilisateur:</label>
                <input type="text" name="inputText" onChange={(e) => { setUsername(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="inputPassword">Mot de passe:</label>
                <input type="password" name="inputPassword" onChange={(e) => setPassword(e.target.value)} />
            </div>

            {loginErr ? <p>Une erreur est survenu</p> : null}

            <button type="submit">Envoyer</button>
        </form>
    )
}

export default Login