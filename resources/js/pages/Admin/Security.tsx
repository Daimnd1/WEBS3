import { Head, router } from "@inertiajs/react";

interface BlockedIP{
    ip: string;
    endpoint: string;
    attempts: number;
    blocked_at: string;
    expires_at: string;
}

interface Incident{
    type: string;
    ip: string;
    endpoint: string;
    attempts?: number;
    ts: string;
    client_total?: number;
    server_total?: number;
}

interface SecurityStats{
    blocked_ips: number;
    total_incidents: number;
    dos_attacks: number;
    tampering_attempts: number;
}

interface Props{
    blockedIPs: BlockedIP[];
    recentIncidents: Incident[];
    stats: SecurityStats;
}

export default function Security({ blockedIPs, recentIncidents, stats }: Props) {
    const unblockIP = (ip: string) => {
        if(confirm(`Are you sure you want to unblock IP ${ip}?`)) {
            router.post('/admin/security/unblock', { ip }, { preserveScroll: true });
        }
    }

    const clearEverything = () => {
        if (confirm('Are you sure you want to clear all security incidents? This action cannot be undone.')) {
            router.post('/admin/security/clear', {}, { preserveScroll: true });
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString();
    }

    const getIncidentDetails = (incident: Incident) => {
        if (incident.type === 'dos_attempt') {
            return `${incident.attempts} attempts`;
        }
        return `${incident.client_total?.toFixed(2)} -> ${incident.server_total?.toFixed(2)}`;
    }

    return (
        <>
            <Head title="Security Dashboard" />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-600">Monitor and manage security incidents</p>
                        </div>
                        <button
                            onClick={clearEverything}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Clear All Incidents
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Blocked IPs</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {stats.blocked_ips || 0}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {stats.total_incidents}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">DoS Attempts</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {stats.dos_attacks || 0}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Tampering Attempts</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {stats.tampering_attempts}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blocked IPs Table */}
                    <div className="bg-white rounded-lg shadow mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Blocked IP Addresses</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Endpoint
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Attempts
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Blocked At
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expires At
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {blockedIPs.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No blocked IPs
                                            </td>
                                        </tr>
                                    ) : (
                                        blockedIPs.map((item) => (
                                            <tr key={item.ip} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.ip}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.endpoint}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {item.attempts}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDate(item.blocked_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDate(item.expires_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => unblockIP(item.ip)}
                                                        className="text-blue-600 hover:text-blue-900 font-medium"
                                                    >
                                                        Unblock
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Incidents Table */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Security Incidents</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Endpoint
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentIncidents.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                No incidents recorded
                                            </td>
                                        </tr>
                                    ) : (
                                        recentIncidents.map((incident, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${(incident.type)}`}>
                                                        {incident.type === 'dos_attempt' ? 'DoS Attempt' : 'Checkout Tampering'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {incident.ip}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {incident.endpoint}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {getIncidentDetails(incident)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDate(incident.ts)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}