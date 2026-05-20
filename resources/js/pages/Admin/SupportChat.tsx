import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
    id: string;
    message: string;
    is_admin: boolean;
    created_at: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    unread_count: number;
}

export default function AdminSupportChat() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/support/messages');
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchMessages = async (userId: string) => {
        try {
            const response = await axios.get(`/support/messages?user_id=${userId}`);
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        setIsLoading(true);
        try {
            await axios.post('/support/messages', {
                message: newMessage,
                user_id: selectedUser.id,
            });
            setNewMessage('');
            await fetchMessages(selectedUser.id);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        const interval = setInterval(fetchUsers, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser.id);
            const interval = setInterval(() => fetchMessages(selectedUser.id), 15000);
            return () => clearInterval(interval);
        }
    }, [selectedUser]);

    return (
        <AdminLayout>
            <Head title="Admin - Customer Support" />

            <div>
                <h1 className="text-2xl font-bold mb-6">Customer Support</h1>

                <div className="grid grid-cols-3 gap-6 h-[600px]">
                    {/* Users List */}
                    <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Customers</h2>
                        {users.length === 0 ? (
                            <p className="text-gray-500 text-sm">No conversations yet</p>
                        ) : (
                            users.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`w-full text-left p-3 rounded-lg mb-2 ${
                                        selectedUser?.id === user.id
                                            ? 'bg-blue-100 border-blue-500'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        {user.unread_count > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                                {user.unread_count}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Chat Window */}
                    <div className="col-span-2 bg-white rounded-lg shadow flex flex-col">
                        {selectedUser ? (
                            <>
                                {/* Header */}
                                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                                    <h3 className="font-semibold">{selectedUser.name}</h3>
                                    <p className="text-xs opacity-75">{selectedUser.email}</p>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-lg p-3 ${
                                                    msg.is_admin
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-800'
                                                }`}
                                            >
                                                <p className="text-sm">{msg.message}</p>
                                                <p className="text-xs mt-1 opacity-70">
                                                    {new Date(msg.created_at).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input */}
                                <form onSubmit={sendMessage} className="p-4 border-t">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your reply..."
                                            className="flex-1 border rounded-lg px-3 py-2"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !newMessage.trim()}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400">
                                Select a customer to view conversation
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}