type PasswordValidationResult = {
  hasNumber: boolean
  hasSpecialChar: boolean
  hasUppercase: boolean
  hasLowercase: boolean
}

export const checkPasswordCharacters = (
  password: string
): PasswordValidationResult => {
  return {
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password)
  }
}
