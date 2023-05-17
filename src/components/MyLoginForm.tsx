import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/MyCustomHooks';
import { changeLoginData, changeState } from '../store/globalSlice';
import s from './MyLoginForm.module.scss';
import styles from '../App.module.scss';

type Props = {};

const MyLoginForm = (props: Props) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const dispatch = useAppDispatch();
    const localStorageId = localStorage.getItem('idInstance');
    const localStorageApiToken = localStorage.getItem('apiTokenInstance');

    useEffect(() => {
        if (localStorageId && localStorageApiToken) {
            dispatch(
                changeLoginData({
                    id: localStorageId,
                    token: localStorageApiToken,
                })
            );
            setIdInstance(localStorageId!);
            setApiTokenInstance(localStorageApiToken!);
        }
    }, []);
    function onLogin() {
        if (idInstance.length !== 0 && apiTokenInstance.length !== 0) {
            dispatch(changeState('form'));
            dispatch(
                changeLoginData({ id: idInstance, token: apiTokenInstance })
            );
            localStorage.setItem('idInstance', idInstance);
            localStorage.setItem('apiTokenInstance', apiTokenInstance);
        }
    }
    return (
        <div className={s.container}>
            <div className={s.loginForm}>
                <input
                    className={styles.inputForm}
                    value={idInstance}
                    type='text'
                    placeholder='Введите idInstance'
                    onChange={(e) => setIdInstance(e.target.value)}
                />
                <input
                    className={styles.inputForm}
                    value={apiTokenInstance}
                    type='text'
                    placeholder='Введите apiTokenInstance'
                    onChange={(e) => setApiTokenInstance(e.target.value)}
                />
                <button
                    className={styles.btnForm}
                    onClick={() => onLogin()}
                    disabled={
                        idInstance.length === 0 || apiTokenInstance.length === 0
                    }>
                    Войти
                </button>
            </div>
        </div>
    );
};

export default MyLoginForm;
