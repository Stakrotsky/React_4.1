import styles from './formLayout.module.css';
import { useState, useRef } from 'react';

const InitialInputsState = {
	email: '',
	password: '',
	confirmPassword: '',
};

const InitialErrorsState = {};

const validateEmail = (email) => {
	if (!email) return 'Электронная почта обязательна';
	if (!/^[a-zA-Z0-9._]+@[^\s@]+\.[^\s@]+$/.test(email))
		return 'Неверный формат электронной почты';
	return null;
};

const validatePasswords = (password) => {
	if (password.length <= 8) {
		return 'Длина пароля должна быть больше 8 символов';
	} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!]*$/.test(password)) {
		return 'Пароль должен содержать строчные и заглавные буквы, цифры и символ "!"';
	}
	return null;
};

const validateConfirmPasswords = (password, confirmPassword) => {
	if (!confirmPassword) return 'Подтверждение пароля обязательно';
	if (confirmPassword !== password) return 'Пароли не совпадают';
	return null;
};

const sendData = (formData) => {
	console.log(formData);
};

export const FormLayout = () => {
	const [inputs, setInputs] = useState(InitialInputsState);
	const [errors, setErrors] = useState(InitialErrorsState);
	const submitButtonRef = useRef(null);

	const { email, password, confirmPassword } = inputs;

	const validateFields = () => {
		const newErrors = {
			email: validateEmail(email),
			password: validatePasswords(password),
			confirmPassword: validateConfirmPasswords(password, confirmPassword),
		};
		setErrors(newErrors);

		const isValid =
			!newErrors.email && !newErrors.password && !newErrors.confirmPassword;

		if (isValid) {
			submitButtonRef.current.focus();
		}

		return isValid;
	};

	const handleFieldUpdate = (name, value) => {
		if (name === 'email') {
			setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
		}
		if (name === 'password' || name === 'confirmPassword') {
			const newPassword = name === 'password' ? value : password;
			const newConfirmPassword =
				name === 'confirmPassword' ? value : confirmPassword;
			setErrors((prevErrors) => ({
				...prevErrors,
				password: validatePasswords(newPassword),
				confirmPassword: validateConfirmPasswords(
					newPassword,
					newConfirmPassword,
				),
			}));
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (validateFields()) {
			sendData({ email, password, confirmPassword });
			setInputs(InitialInputsState);
			setErrors(InitialErrorsState);
		}
	};

	const onChange = ({ target }) => {
		const { name, value } = target;
		setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
		handleFieldUpdate(name, value);
	};

	return (
		<div className={styles['registration-form']}>
			<h2>Регистрация</h2>
			<form onSubmit={onSubmit}>
				{errors.email && <div className={styles.error}>{errors.email}</div>}
				{errors.password && <div className={styles.error}>{errors.password}</div>}
				{errors.confirmPassword && (
					<div className={styles.error}>{errors.confirmPassword}</div>
				)}
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					className={styles['registration-input']}
					onChange={onChange}
				/>
				<input
					className={styles['registration-input']}
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onChange}
				/>
				<input
					className={styles['registration-input']}
					type="password"
					value={confirmPassword}
					name="confirmPassword"
					placeholder="Повторите пароль"
					onChange={onChange}
				/>
				<button
					ref={submitButtonRef}
					className={styles['registration-button']}
					type="submit"
					disabled={
						!(
							!validateEmail(email) &&
							!validatePasswords(password) &&
							!validateConfirmPasswords(password, confirmPassword)
						)
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
