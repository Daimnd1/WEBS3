import { useState, useEffect, useRef, FormEvent } from 'react';
import axios from 'axios';

interface Message {
    id: string;
    message: string;
    is_admin: boolean;
    created_at: string;
}

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/support/messages');
            setMessages(response.data.messages || []);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('/support/unread-count');
            setUnreadCount(response.data.unread_count || 0);
        } catch (error) {
            // Silently fail
        }
    };

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        setIsLoading(true);
        const messageText = newMessage;
        setNewMessage('');

        try {
            await axios.post('/support/messages', { message: messageText });
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            setNewMessage(messageText);
            alert('Failed to send message.');
        } finally {
            setIsLoading(false);
        }
    };

    // Only poll when chat is open
    useEffect(() => {
        if (isOpen) {
            fetchMessages();
            
            pollIntervalRef.current = setInterval(() => {
                fetchMessages();
            }, 30000);
        } else {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
            }
        }

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [isOpen]);

    // Fetch unread count on mount
    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 120000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110"
                aria-label="Open support chat"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="font-semibold">Customer Support</h3>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-white hover:text-gray-200 transition"
                            aria-label="Close chat"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center mt-10">
                                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <p className="text-gray-500 text-sm font-medium">No messages yet</p>
                                <p className="text-gray-400 text-xs mt-1">Send us a message!</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[75%] rounded-lg p-3 ${
                                            msg.is_admin
                                                ? 'bg-gray-200 text-gray-800'
                                                : 'bg-blue-600 text-white'
                                        }`}
                                    >
                                        {msg.is_admin && (
                                            <p className="text-xs font-semibold mb-1 opacity-70">Support Team</p>
                                        )}
                                        <p className="text-sm break-words">{msg.message}</p>
                                        <p className="text-xs mt-1 opacity-70">
                                            {new Date(msg.created_at).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="p-4 border-t bg-white rounded-b-lg">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                maxLength={500}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !newMessage.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            >
                                {isLoading ? '...' : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}