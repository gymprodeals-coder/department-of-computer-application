import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, LayoutDashboard, Users, CalendarDays, Loader2, ArrowUpDown } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHcDzmPF2LJ-22-eQPaOppO_kQFXeGFiHhAbjKtUQ_khiAPQoN_JVHnCfsQ9lUp1HQ/exec";

const EVENT_LIST = [
    "IPL Auction",
    "Wealth Out Of Waste",
    "Fireless Cooking",
    "Quiz",
    "Dance",
    "creAIte",
    "Game Smith",
    "AI Solve X",
    "404: Human Not Found",
    "AI Maestro",
    "Snap AI"
];

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters and Search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('All Events');

    // Sorting
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(SCRIPT_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch data. Make sure Google Apps Script has a doGet function returning JSON.");
            }
            const data = await response.json();

            // Expected data format: Array of objects or object with data array
            let records = [];
            if (Array.isArray(data)) {
                // If it's directly an array
                records = data;
            } else if (data && Array.isArray(data.data)) {
                // If wrapped in { status: "success", data: [...] }
                records = data.data;
            }

            // Assuming first row might be headers from some APIs, clean it if needed
            // But let's assume valid JSON array of objects
            setRegistrations(records);
        } catch (err) {
            console.error(err);
            // Don't show technical error to user, offer mock data if needed or a friendly message
            setError("Unable to load data. Please ensure the Apps Script allows GET requests. (Error: " + err.message + ")");
        } finally {
            setLoading(false);
        }
    };

    // Calculate derived data
    const filteredAndSortedRegistrations = useMemo(() => {
        let filtered = [...registrations];

        if (selectedEvent !== 'All Events') {
            filtered = filtered.filter(reg =>
                reg['Event Name'] === selectedEvent ||
                reg.event === selectedEvent ||
                reg.eventName === selectedEvent
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(reg => {
                const nameMatch = Object.values(reg).some(val =>
                    String(val).toLowerCase().includes(query)
                );
                return nameMatch;
            });
        }

        filtered.sort((a, b) => {
            // Find timestamp key
            const timeA = new Date(a['Registration Time'] || a.timestamp || a.Timestamp || 0).getTime();
            const timeB = new Date(b['Registration Time'] || b.timestamp || b.Timestamp || 0).getTime();

            return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
        });

        return filtered;
    }, [registrations, selectedEvent, searchQuery, sortOrder]);

    const stats = useMemo(() => {
        const totalRegistrations = registrations.length;

        // Count per event
        const eventCounts = {};
        EVENT_LIST.forEach(e => eventCounts[e] = 0);

        registrations.forEach(reg => {
            const ev = reg['Event Name'] || reg.event || reg.eventName;
            if (ev) {
                // Match with keys
                const trimmed = ev.trim();
                eventCounts[trimmed] = (eventCounts[trimmed] || 0) + 1;
            }
        });

        const activeEventsCount = Object.values(eventCounts).filter(c => c > 0).length;

        return { totalRegistrations, activeEventsCount, eventCounts };
    }, [registrations]);

    const handleExportCSV = () => {
        if (filteredAndSortedRegistrations.length === 0) return;

        // Extract headers from first object
        const headers = ['Name', 'Email', 'Mobile', 'Department', 'Class', 'Year', 'Event Name', 'Registration Time'];

        const csvRows = [];
        csvRows.push(headers.join(',')); // Add headers

        filteredAndSortedRegistrations.forEach(row => {
            const values = [
                row.Name || row.name || 'N/A',
                row.Email || row.email || 'N/A',
                row.Mobile || row.mobile || row['Mobile Number'] || 'N/A',
                row.Department || row.department || 'N/A',
                row.Class || row.class || 'N/A',
                row.Year || row.year || row['Year of Study'] || 'N/A',
                row['Event Name'] || row.event || row.eventName || 'N/A',
                row['Registration Time'] || row.timestamp || row.Timestamp || 'N/A'
            ];

            // Escape commas
            const escaped = values.map(v => `"${String(v).replace(/"/g, '""')}"`);
            csvRows.push(escaped.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event_registrations_${selectedEvent.replace(/\s+/g, '_')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
                            <LayoutDashboard className="text-blue-500" size={36} />
                            Event Registration Dashboard
                        </h1>
                        <p className="text-slate-400 mt-2">Manage and view all student registrations across events.</p>
                    </div>
                    <button
                        onClick={handleExportCSV}
                        disabled={filteredAndSortedRegistrations.length === 0}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="p-4 bg-blue-500/20 text-blue-400 rounded-xl">
                            <Users size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Registrations</p>
                            <h2 className="text-4xl font-black text-white">{stats.totalRegistrations}</h2>
                        </div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="p-4 bg-purple-500/20 text-purple-400 rounded-xl">
                            <CalendarDays size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Active Events</p>
                            <h2 className="text-4xl font-black text-white">{stats.activeEventsCount}</h2>
                        </div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[120px] custom-scrollbar">
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 sticky top-0 bg-slate-900/90 py-1">Registrations per Event</p>
                        <div className="space-y-1.5">
                            {Object.entries(stats.eventCounts).sort((a, b) => b[1] - a[1]).map(([eventName, count]) => (
                                count > 0 && (
                                    <div key={eventName} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-300 truncate pr-2">{eventName}</span>
                                        <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded-md">{count}</span>
                                    </div>
                                )
                            ))}
                            {stats.totalRegistrations === 0 && <p className="text-sm text-slate-500">No data available.</p>}
                        </div>
                    </div>
                </div>

                {/* Event Registration Count Section (Detailed) */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Event Registration Count</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {EVENT_LIST.map(eventName => (
                            <div key={eventName} className="bg-slate-800/50 p-3 rounded-lg flex justify-between items-center border border-slate-700/30">
                                <span className="text-slate-300 font-medium text-sm truncate mr-2" title={eventName}>{eventName}</span>
                                <span className="text-emerald-400 font-bold text-sm whitespace-nowrap">{stats.eventCounts[eventName] || 0} participants</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls: Search, Filter, Sort */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl p-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">

                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, mobile, etc..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition-all"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Filter */}
                            <div className="relative min-w-[200px] w-full sm:w-auto">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter size={18} className="text-slate-400" />
                                </div>
                                <select
                                    value={selectedEvent}
                                    onChange={(e) => setSelectedEvent(e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-700 text-white pl-10 pr-10 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all"
                                >
                                    <option value="All Events">All Events</option>
                                    {EVENT_LIST.map(eventName => (
                                        <option key={eventName} value={eventName}>{eventName}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Toggle */}
                            <button
                                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                                className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2.5 rounded-lg transition-all w-full sm:w-auto"
                            >
                                <ArrowUpDown size={18} className="text-blue-400" />
                                <span className="hidden sm:inline">Sort: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                            <div className="mt-2 text-slate-300">
                                <p><strong>Note for Developer:</strong> Your Google Apps Script requires a `doGet` function to read data. Please add this code to your Apps Script:</p>
                                <pre className="mt-2 text-xs bg-slate-900 border border-slate-800 p-3 rounded overflow-x-auto text-emerald-400">
                                    {`function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    result.push(obj);
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Data Table */}
                    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700/50">
                        <table className="w-full text-left text-sm whitespace-nowrap text-slate-300">
                            <thead className="text-xs uppercase bg-slate-800/80 text-slate-400 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Class/Year</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Event Name</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Reg. Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 bg-slate-900/30">
                                {loading && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
                                            <p className="text-slate-400">Loading registrations from Google Sheets...</p>
                                        </td>
                                    </tr>
                                )}

                                {!loading && !error && filteredAndSortedRegistrations.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            No registrations found matching your current filters.
                                        </td>
                                    </tr>
                                )}

                                {!loading && filteredAndSortedRegistrations.map((row, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                                        key={idx}
                                        className="hover:bg-slate-800/40 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">{row.Name || row.name || 'N/A'}</div>
                                            <div className="text-xs text-slate-500">{row.Email || row.email || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-300">
                                            {row.Mobile || row.mobile || row['Mobile Number'] || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.Department || row.department || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>{row.Class || row.class || 'N/A'}</div>
                                            <div className="text-xs text-slate-500">Year {row.Year || row.year || row['Year of Study'] || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                                                {row['Event Name'] || row.event || row.eventName || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-400 text-xs font-medium">
                                            {row['Registration Time'] || row.timestamp || row.Timestamp ? new Date(row['Registration Time'] || row.timestamp || row.Timestamp).toLocaleString() : 'N/A'}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
