import React from 'react';
import { Calendar, Clock, MapPin, AlarmClock } from 'lucide-react';

const EventSchedule = ({ event }) => {
    return (
        <div className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b border-slate-700 pb-4">
                <Calendar size={28} className="text-purple-400" /> Event Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Date</p>
                        <p className="text-white font-medium">16/03/2026 – 19/03/2026</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                        <AlarmClock size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Spot Registration</p>
                        <p className="text-white font-medium">01:15 PM</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Event Time</p>
                        <p className="text-white font-medium">01:30 PM – 04:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventSchedule;
