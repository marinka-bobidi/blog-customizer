import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Select } from 'components/select/';
import { Button } from 'components/button';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, useState } from 'react';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	isFixedOpen?: boolean;
	ParamsState: ArticleStateType;
	setApp: (el: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isFixedOpen = false,
	ParamsState,
	setApp,
}) => {
	const [formState, setFormState] = useState<ArticleStateType>(ParamsState);

	const setFormStateFunc = (value: OptionType, name: string) => {
		const new_obj = {
			...formState,
			[name]: value,
		};
		setFormState(new_obj);
	};

	const [isOpen, setIsOpen] = useState(false);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};
	const handleSubmit = (event: FormEvent) => {
		setApp(formState);
		event.preventDefault();
	};

	const resetSubmit = () => {
		setFormState(ParamsState);
		setApp(ParamsState);
	};

	return (
		<>
			<ArrowButton onClick={togglePanel} isOpen={isOpen} />
			<div
				className={
					isOpen
						? clsx(styles.overlay_open, styles.overlay)
						: clsx(styles.overlay)
				}
				onClick={togglePanel}></div>
			<aside
				className={
					isOpen
						? clsx([styles.container_open, styles.container])
						: clsx([styles.container])
				}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						handleSubmit(e);
					}}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(font) => {
							setFormStateFunc(font, 'fontFamilyOption');
						}}
						options={fontFamilyOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<RadioGroup
						name='font size'
						selected={formState.fontSizeOption}
						onChange={(size) => {
							setFormStateFunc(size, 'fontSizeOption');
						}}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'></RadioGroup>
					<Select
						selected={formState.fontColor}
						onChange={(color) => {
							setFormStateFunc(color, 'fontColor');
						}}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(color) => {
							setFormStateFunc(color, 'backgroundColor');
						}}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(width) => {
							setFormStateFunc(width, 'contentWidth');
						}}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetSubmit} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
