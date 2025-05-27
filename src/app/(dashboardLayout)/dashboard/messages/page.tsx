import MessageComponent from "@/components/messages-component/MessagesComponent";
import { getMessagesData } from "@/services/messages";

export const metadata = {
    title: 'Portfolio | Manage Messages',
    description: 'Manage your messages',
};

export default async function ManageMessages() {
    const {data} = await getMessagesData();
    return (
        <MessageComponent messages = {data} />
    );
}