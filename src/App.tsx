import React from 'react';
import s from './App.module.scss';
import MyPhoneForm from './components/MyPhoneForm';
import MyChat from './components/MyChat';
import { useAppSelector } from './hooks/MyCustomHooks';
import MyLoginForm from './components/MyLoginForm';

function App() {
    const state = useAppSelector((state) => state.global.appState);

    const component =
        state === 'login' ? (
            <MyLoginForm />
        ) : state === 'form' ? (
            <MyPhoneForm />
        ) : (
            <MyChat />
        );
    return (
        <div className={s.cont}>
            <div className={s.app}> {component}</div>
            <div className={s.blur}> </div>
        </div>
    );
}

export default App;
