import { useState } from "react"

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
        <form onSubmit={handleForm}>
            <div>
                <label htmlFor="inputDescription">Description</label>
                <input type="text" name="inputDescription" onChange={(e) => { setDescription(e.target.value) }} />
            </div>

            <div>
                <label htmlFor="inputFile">Choisir une image</label>
                <input type="file" name="inputFile" onChange={(e) => { setFile(e.target.files[0]) }} />
            </div>
            {errAddPost ? <p>Une erreur est survenu</p> : null}
            <button type="submit">Envoyer</button>
        </form>)


}

export default AddPost