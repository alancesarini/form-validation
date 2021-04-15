import React, { useState } from 'react';
import Message from './Message';

const Form = () => {
	const [data, setData] = useState({});
	const [valid, setValid] = useState({});
	const [validForm, setValidForm] = useState(false);

	const validationRules = {
		name: {
			regExp: /^[A-Za-z]{3,30}$/,
			errorMessage: 'Name invalid!',
		},
		email: {
			// Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
			regExp: /^\S+@\S+[\.][0-9a-z]+$/,
			errorMessage: 'Email invalid!',
		},
		phone: {
			regExp: /^[2,9]\d{9}$/,
			errorMessage: 'Phone invalid!',
		},
		url: {
			// Taken from https://stackoverflow.com/questions/4275525/regex-for-urls-without-http-https-ftp
			//regExp: /^(?:(http|https):\/\/)?(?:[\w-]+\.)+[a-z]$/,
			regExp: /((https|http)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)$/,
			errorMessage: 'URL invalid!',
		},
	};

	const isValid = (id, value) => {
		const regExp = validationRules[id].regExp;
		return regExp.test(value);
	};

	const changeHandler = (event) => {
		const id = event.target.id;
		const value = event.target.value;

		setData({
			...data,
			[id]: value,
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const validName = isValid('name', data.name);
		const validEmail = isValid('email', data.email);
		const validPhone = isValid('phone', data.phone);
		const validURL = isValid('url', data.url);

		setValid({
			name: validName,
			email: validEmail,
			phone: validPhone,
			url: validURL,
		});

		setValidForm(validName && validEmail && validPhone && validURL);
	};

	const renderMessage = () => {
		if (validForm) {
			return <Message msg={'Form is complete!'} />;
		}

		if (!valid['name']) {
			return <Message msg={validationRules.name.errorMessage} />;
		}

		if (!valid['email']) {
			return <Message msg={validationRules.email.errorMessage} />;
		}

		if (!valid['phone']) {
			return <Message msg={validationRules.phone.errorMessage} />;
		}

		if (!valid['url']) {
			return <Message msg={validationRules.url.errorMessage} />;
		}
	};

	return (
		<div className="row">
			<h1 className="text-center">Form Validation</h1>
			<form onSubmit={submitHandler}>
				<div className="small-6 small-centered">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={data['name']}
						onChange={changeHandler}
					/>
				</div>

				<div className="small-6 small-centered">
					<label htmlFor="email">Email:</label>
					{/* Using TEXT as input type instead of EMAIL just to handle all validtion logic */}
					<input
						type="text"
						id="email"
						name="email"
						value={data['email']}
						onChange={changeHandler}
					/>
				</div>

				<div className="small-6 small-centered">
					<label htmlFor="phone">Phone:</label>
					<input
						type="text"
						id="phone"
						name="phone"
						value={data['phone']}
						onChange={changeHandler}
					/>
				</div>

				<div className="small-6 small-centered">
					<label htmlFor="url">Blog URL:</label>
					{/* Using TEXT as input type instead of URL just to handle all validtion logic */}
					<input
						type="text"
						id="url"
						name="url"
						value={data['url']}
						onChange={changeHandler}
					/>
				</div>

				<div className="small-6 small-centered text-center columns">
					<button className="button success expand round text-center">
						Verify
					</button>
				</div>

				<div className="small-6 small-centered text-center columns">
					{renderMessage()}
				</div>
			</form>
		</div>
	);
};

export default Form;
