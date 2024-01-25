export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Email is not valid';
  }
  return '';
};

export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }
  else if (name.length < 3) {
    return 'Name should be at least 3 characters';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 6) {
    return 'Password should be at least 6 characters';
  }
  return '';
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Please confirm password';
  } else if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateForm = (email, name, password, confirmPassword) => {
  const emailError = validateEmail(email);
  const nameError = validateName(name);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

  return {
    emailError,
    nameError,
    passwordError,
    confirmPasswordError,
    isValid:
      emailError === '' &&
      nameError === '' &&
      passwordError === '' &&
      confirmPasswordError === '',
  };
};
