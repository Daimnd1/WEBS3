import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface OrderStatus {
    id: number;
    name: string;
}

interface Order {
    id: string;
    user: { name: string; email: string } | null;
    status: string;
    shipping_address: string | null;
    total: number;
    items_count: number;
}

interface Props {
    orders: Order[];
    statuses: OrderStatus[];
}

const statusColors: Record<string, string> = {
    PENDING:    'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED:    'bg-indigo-100 text-indigo-800',
    DELIVERED:  'bg-green-100 text-green-800',
    CANCELLED:  'bg-red-100 text-red-800',
};

export default function Orders({ orders, statuses }: Props) {
    const [updating, setUpdating] = useState<string | null>(null);

    const handleStatusChange = (orderId: string, statusId: string) => {
        setUpdating(orderId);
        router.patch(
            route('admin.orders.update', orderId),
            { status_id: statusId },
            { onFinish: () => setUpdating(null) },
        );
    };

    return (
        <AdminLayout>
            <Head title="Admin – Orders" />

            <div>
                <h1 className="text-2xl font-bold mb-6">Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-16 text-center text-gray-400">
                        No orders yet.
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 hover:bg-gray-50">
                                    <TableHead className="font-semibold">Order ID</TableHead>
                                    <TableHead className="font-semibold">Customer</TableHead>
                                    <TableHead className="font-semibold">Items</TableHead>
                                    <TableHead className="font-semibold">Total</TableHead>
                                    <TableHead className="font-semibold">Shipping Address</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-gray-50">
                                        <TableCell className="font-mono text-xs text-gray-500">
                                            {order.id.slice(0, 8)}…
                                        </TableCell>
                                        <TableCell>
                                            {order.user ? (
                                                <div>
                                                    <p className="font-medium text-gray-900">{order.user.name}</p>
                                                    <p className="text-xs text-gray-400">{order.user.email}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Deleted user</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-gray-700">{order.items_count}</TableCell>
                                        <TableCell className="font-semibold text-gray-900">
                                            ${Number(order.total).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600 max-w-[180px] truncate">
                                            {order.shipping_address || '—'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                                                    {order.status}
                                                </span>
                                                <Select
                                                    onValueChange={(val) => handleStatusChange(order.id, val)}
                                                    disabled={updating === order.id}
                                                >
                                                    <SelectTrigger className="h-7 w-28 text-xs">
                                                        <SelectValue placeholder="Update" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuses.map((s) => (
                                                            <SelectItem key={s.id} value={String(s.id)} className="text-xs">
                                                                {s.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
