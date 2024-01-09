
function ListUsers() {

    var header = new Headers()
    header.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    

    var requestOptions = {
        method: 'GET',
        headers: header,
    };
    fetch('https://symfony-instawish.formaterz.fr/api/users', requestOptions).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json()
    }).then(
        (value) => {
            console.log(value)
            // userData.push(value) ?
            // useState ?
        }
    ).catch((reason) => {
        console.log('erreur')
    })

    // Afficher la liste des utilisateurs dans le dom avec l'option de follow.
    return <ul></ul>

}
export default ListUsers