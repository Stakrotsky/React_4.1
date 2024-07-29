export const validateEmail = (email) => {
	if (!email) return 'Электронная почта обязательна';
	if (!/^[a-zA-Z0-9._]+@[^\s@]+\.[^\s@]+$/.test(email))
		return 'Неверный формат электронной почты';
	return null;
};

export const validatePasswords = (password) => {
	if (password.length <= 8) {
		return 'Длина пароля должна быть больше 8 символов';
	} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!]*$/.test(password)) {
		return 'Пароль должен содержать строчные и заглавные буквы, цифры и символ "!"';
	}
	return null;
};

export const validateConfirmPasswords = (password, confirmPassword) => {
	if (!confirmPassword) return 'Подтверждение пароля обязательно';
	if (confirmPassword !== password) return 'Пароли не совпадают';
	return null;
};
