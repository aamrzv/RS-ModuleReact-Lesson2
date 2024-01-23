import logo from './logo.svg';
import './App.css';
import styles from './App.module.css';
import { useState } from 'react';
import * as math from 'mathjs';

function App() {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);
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

	const handleNumClick = (num) => {
		if (isResult) {
			// Если результат уже отображается, начинаем новое вычисление
			setOperand1(num);
			setOperator('');
			setOperand2('');
			setIsResult(false);
		} else if (!operator) {
			// Если оператор не задан, обновляем operand1
			setOperand1((prevValue) => prevValue + num);
		} else {
			// Если оператор задан, обновляем operand2
			setOperand2((prevValue) => prevValue + num);
		}
	};

	const handleOperatorClick = (clickedOperator) => {
		setIsResult(false); // Сброс подсветки результата при выборе оператора
		if (clickedOperator === 'C') {
			// Сброс всех состояний при клике на "C"
			setOperand1('');
			setOperator('');
			setOperand2('');
		} else if (clickedOperator === '=') {
			// Обработка кнопки "="
			if (operand1 && operand2) {
				// Вычисление результата при наличии operand и operator
				let result;
				switch (operator) {
					case '+':
						result = Number(operand1) + Number(operand2);
						break;
					case '-':
						result = Number(operand1) - Number(operand2);
						break;
					default:
						result = 0;
				}
				setOperand1(result.toString());
				setOperator('');
				setOperand2('');
				setIsResult(true); // Подсветка результата
			}
		} else {
			// Обработка остальных операторов при наличии operand1
			setOperator(operand1 ? clickedOperator : '');
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Калькулятор</p>
				<div className={styles.contener}>
					<div>
						<span className={styles.bnt + ' ' + styles.resetBtn} onClick={() => handleOperatorClick('C')}>
							C
						</span>
						<div className={isResult ? styles.screen + ' ' + styles.screenBacklight : styles.screen}>
							{operand1 + operator + operand2}
						</div>
					</div>
					<div className={styles.numBlock}>
						{NUMS.map(({ id, name }) => (
							<span className={styles.bnt + ' ' + styles.numBnt} key={id} onClick={() => handleNumClick(name)}>
								{name}
							</span>
						))}
						<span className={styles.equalBnt} onClick={() => handleOperatorClick('=')}>
							=
						</span>
					</div>
					<span className={styles.bnt + ' ' + styles.operatorBtn} onClick={() => handleOperatorClick('+')}>
						+
					</span>
					<span className={styles.bnt + ' ' + styles.operatorBtn} onClick={() => handleOperatorClick('-')}>
						-
					</span>
				</div>
			</header>
		</div>
	);
}

export default App;
