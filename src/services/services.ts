import axios from 'axios';
import { useAppSelector } from '../hooks/MyCustomHooks';
const baseURL = 'https://api.green-api.com';
const idInstance = '1101820632';
const apiTokenInstance = '2af0d39652404044913259e23fcc678426e1caabe60d47719f';
export type ServiceData = {
    id: string;
    message: string;
};
export class Services {
    static sendMessage({ id, message }: ServiceData) {
        axios.post(
            `${baseURL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
            {
                chatId: id,
                message: message,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    static async getMessage() {
        const response = await axios.get(
            `${baseURL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
        );
        return response.data;
    }

    static deleteMessage(receiptId: string) {
        axios.delete(
            `${baseURL}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
    }
}
