import styles from './form.module.css';
import { useState, useRef, useEffect } from 'react';
import {
	validateEmail,
	validatePasswords,
	validateConfirmPasswords,
} from './components/validates';
import { sendData } from './components/sendData';

const InitialInputsState = {
	email: '',
	password: '',
	confirmPassword: '',
};

const InitialErrorsState = {};

export const Form = () => {
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

	useEffect(() => {
		if (!errors.email && !errors.password && !errors.confirmPassword) {
			submitButtonRef.current?.focus();
		}
	}, [errors]);

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
