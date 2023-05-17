import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/MyCustomHooks';
import { changeChatId, changeState } from '../store/globalSlice';
import s from './MyPhoneForm.module.scss';
import styles from '../App.module.scss';

type Props = {};

const MyPhoneForm = (props: Props) => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useAppDispatch();

    function openChat() {
        dispatch(changeState('chat'));
        dispatch(changeChatId(`${inputValue}@c.us`));
    }
    function openChatEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            dispatch(changeState('chat'));
            dispatch(changeChatId(`${inputValue}@c.us`));
        }
    }

    return (
        <div className={s.phoneForm}>
            <input
                className={styles.inputForm}
                placeholder='Введите номер в формате 7XXXXXXXXXX'
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
                onKeyUp={(e) => openChatEnter(e)}
            />
            <button
                className={styles.btnForm}
                disabled={inputValue.length < 11}
                onClick={() => openChat()}>
                Создать чат
            </button>
        </div>
    );
};

export default MyPhoneForm;
