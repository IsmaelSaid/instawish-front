import { ArePasswordsEq, isPasswordMatchRegex } from './utils'; // Assure-toi que le chemin est correct

/**
 * Tests pour les fonctions de validation des mots de passe.
 */

// Test pour ArePasswordsEq
test('ArePasswordsEq retourne true lorsque les mots de passe sont identiques', () => {
  const result = ArePasswordsEq('password123', 'password123');
  expect(result).toBe(true);
});

test('ArePasswordsEq retourne false lorsque les mots de passe ne sont pas identiques', () => {
  const result = ArePasswordsEq('password123', 'differentPassword');
  expect(result).toBe(false);
});

// Test supplémentaire pour ArePasswordsEq
test('ArePasswordsEq retourne false lorsque les mots de passe ne sont pas identiques', () => {
  const result = ArePasswordsEq('password123', 'differentPassword');
  console.log(result);
  expect(result).toBe(false);
});

// Test pour isPasswordMatchRegex
test('isPasswordMatchRegex retourne true lorsque le mot de passe correspond à la regex', () => {
  const result = isPasswordMatchRegex('Password123', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
  expect(result).toBe(true);
});

test('isPasswordMatchRegex retourne false lorsque le mot de passe ne correspond pas à la regex', () => {
  const result = isPasswordMatchRegex('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
  expect(result).toBe(false);
});
