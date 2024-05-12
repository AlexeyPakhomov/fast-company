export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_LOGIN_CREDENTIALS':
    case 'INVALID_DATA':
    case 'INVALID_PASSWORD':
    case 'EMAIL_NOT_FOUND':
      return 'Email или пароль введены некорректно';
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует';
    default:
      return 'Слишком много попыток входа. Попробуйте позже';
  }
}
