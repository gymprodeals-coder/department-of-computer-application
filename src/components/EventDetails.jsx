import React from 'react';
import { CalendarDays, MapPin, Users, ListChecks } from 'lucide-react';

const EventDetails = ({ event, club }) => {
    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold mb-4 text-purple-400 border-b border-white/10 pb-2">About The Event</h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                    {event.description}
                </p>
            </section>

            <section className="bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-700/50 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-pink-400 border-b border-slate-700 pb-4 flex items-center gap-3">
                    <ListChecks size={28} /> Rules & Regulations
                </h2>
                <ul className="space-y-4">
                    {event.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                            <div className="mt-0.5 min-w-[20px]">
                                <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                                    <span className="text-xs font-bold">{idx + 1}</span>
                                </div>
                            </div>
                            <span className="text-slate-300 text-md leading-relaxed">{rule}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Date</h3>
                            <p className="text-white text-lg font-medium">{event.date}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Venue</h3>
                            <p className="text-white text-lg font-medium">{event.venue}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-pink-500/20 text-pink-400">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Eligibility</h3>
                            <p className="text-white text-lg font-medium">{event.eligibility}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetails;
