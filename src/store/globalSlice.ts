import { createSlice } from '@reduxjs/toolkit';
type Message = {
    id: number;
    message: string;
    idChat: string;
};
interface AppState {
    idInstance: string;
    apiTokenInstance: string;
    appState: string;
    chatId: string;
    messages: Message[];
}

// Define the initial state using that type
const initialState = {
    idInstance: '',
    apiTokenInstance: '',
    appState: 'login',
    chatId: '',
    messages: [],
} as AppState;

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        changeState: (state, { payload }) => {
            state.appState = payload;
        },
        changeChatId: (state, action) => {
            state.chatId = action.payload;
        },
        addMessage: (state, { payload }) => {
            state.messages.push(payload);
        },

        changeLoginData: (state, { payload }) => {
            state.idInstance = payload.id;
            state.apiTokenInstance = payload.token;
        },
    },
});

export const {
    changeState,
    changeChatId,
    addMessage,

    changeLoginData,
} = globalSlice.actions;
export default globalSlice.reducer;
