import logo from './logo.svg';
import './App.css';
import styles from './App.module.css';
import { useState } from 'react';
import * as math from 'mathjs';

function App() {
	const [value, setValue] = useState('');
	const [showBacklight, setShowBacklight] = useState(false);
	const ButtonClick = (value) => {
		setValue((prevValue) => prevValue + value);
		setShowBacklight(false);
	};
	const ResetButtonClick = () => {
		setValue('');
		setShowBacklight(false);
	};
	const EqualButtonClick = () => {
		try {
			const result = math.evaluate(value);
			setShowBacklight(true);
			setValue(result.toString());
		} catch (error) {
			// Если произошла ошибка при вычислении, обработаем её
			setValue('Error');
		}
	};
	const NUMS = [
		{ id: '1', name: '1' },
		{ id: '2', name: '2' },
		{ id: '3', name: '3' },
		{ id: '4', name: '4' },
		{ id: '5', name: '5' },
		{ id: '6', name: '6' },
		{ id: '7', name: '7' },
		{ id: '8', name: '8' },
		{ id: '9', name: '9' },
		{ id: '0', name: '0' },
	];
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Калькулятор</p>
				<div className={styles.contener}>
					<div>
						<div className={styles.bnt + ' ' + styles.resetBtn} onClick={ResetButtonClick}>
							C
						</div>
						<div className={showBacklight ? styles.screen + ' ' + styles.screenBacklight : styles.screen}>{value}</div>
					</div>
					<div className={styles.numBlock}>
						{NUMS.map(({ id, name }) => (
							<div className={styles.bnt + ' ' + styles.numBnt} key={id} onClick={() => ButtonClick(name)}>
								{name}
							</div>
						))}
						<div className={styles.equalBnt} onClick={EqualButtonClick}>
							=
						</div>
					</div>
					<div className={styles.bnt + ' ' + styles.operatorBtn} onClick={() => ButtonClick('+')}>
						+
					</div>
					<div className={styles.bnt + ' ' + styles.operatorBtn} onClick={() => ButtonClick('-')}>
						-
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
