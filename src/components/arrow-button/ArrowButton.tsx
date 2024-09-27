import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
	isOpen: boolean;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	onClick,
	isOpen,
}) => {
	console.log(isOpen);
	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				isOpen
					? clsx(styles.container, styles.container_open)
					: clsx(styles.container)
			}
			onClick={onClick}
			onKeyPress={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick();
				}
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={isOpen ? clsx([styles.arrow_open]) : clsx([styles.arrow])}
			/>
		</div>
	);
};
