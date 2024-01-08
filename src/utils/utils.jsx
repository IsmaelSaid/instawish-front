/**
 * Vérifie si deux mots de passe sont identiques.
 * 
 * @param {string} passwd1 - Le premier mot de passe.
 * @param {string} passwd2 - Le deuxième mot de passe à comparer.
 * @returns {boolean} - True si les mots de passe sont identiques, sinon false.
 */
export const ArePasswordsEq = (passwd1, passwd2) => {
    return passwd1 === passwd2;
}

/**
 * Vérifie si un mot de passe correspond à une expression régulière donnée.
 * 
 * @param {string} passwd - Le mot de passe à vérifier.
 * @param {RegExp} regex - L'expression régulière à utiliser pour la validation.
 * @returns {boolean} - True si le mot de passe correspond à la regex, sinon false.
 */
export const isPasswordMatchRegex = (passwd, regex) => {
    return regex.test(passwd);
}
