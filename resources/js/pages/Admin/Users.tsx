import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    message_count: number;
    created_at: string | null;
}

interface Props {
    users: User[];
}

const roleColors: Record<string, string> = {
    admin:     'bg-indigo-100 text-indigo-800',
    moderator: 'bg-violet-100 text-violet-800',
    customer:  'bg-gray-100 text-gray-700',
};

export default function Users({ users }: Props) {
    return (
        <AdminLayout>
            <Head title="Admin – Users" />

            <div>
                <h1 className="text-2xl font-bold mb-6">Users</h1>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Role</TableHead>
                                <TableHead className="font-semibold">Support Messages</TableHead>
                                <TableHead className="font-semibold">Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${roleColors[user.role] ?? 'bg-gray-100 text-gray-700'}`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-700">{user.message_count}</TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString()
                                            : '—'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
