import React, { useEffect, useRef, useState } from 'react';
import { Services } from '../services/services';
import { useAppDispatch, useAppSelector } from '../hooks/MyCustomHooks';
import { addMessage } from '../store/globalSlice';
import s from './MyChat.module.scss';

type Props = {};
//
const MyChat = (props: Props) => {
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();
    const id = useAppSelector((state) => state.global.chatId);
    const myMessages = useAppSelector((state) => state.global.messages);
    const myChat = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            Services.getMessage().then((data) => {
                if (data) {
                    if (data.body.typeWebhook === 'incomingMessageReceived') {
                        dispatch(
                            addMessage({
                                id: Date.now(),
                                message:
                                    data.body.messageData.textMessageData
                                        .textMessage,
                                idChat: 'guest',
                            })
                        );
                        Services.deleteMessage(data.receiptId);
                    } else {
                        Services.deleteMessage(data.receiptId);
                    }
                }
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, [id]);

    function sendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            Services.sendMessage({ id, message });
            dispatch(
                addMessage({
                    id: Date.now(),
                    message: message,
                    idChat: 'myMes',
                })
            );

            setTimeout(() => {
                myChat.current?.scrollIntoView(false);
            }, 0);
            setMessage('');
        }
    }

    return (
        <div
            className={s.container}
            ref={myChat}>
            <div
                className={s.top_panel}
                id='topPanel'>
                {[...myMessages]
                    .sort((a, b) => a.id - b.id)
                    .map((mes) => (
                        <div
                            key={mes.id}
                            className={s[mes.idChat]}>
                            {mes.message}
                        </div>
                    ))}
            </div>
            <div className={s.bottom_panel}>
                <textarea
                    autoFocus
                    className={s.textArea}
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMessage(e.target.value)
                    }
                    onKeyUp={(e) => sendMessage(e)}
                />
            </div>
        </div>
    );
};

export default MyChat;
