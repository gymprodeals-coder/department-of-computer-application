import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { eventsData, clubs } from '../data';
import EventDetails from '../components/EventDetails';
import RegistrationForm from '../components/RegistrationForm';

const EventDetailsPage = () => {
    const { clubId, eventId } = useParams();
    const navigate = useNavigate();

    const event = eventsData[clubId]?.find(e => e.id === eventId);
    const club = clubs.find(c => c.id === clubId);

    if (!event || !club) {
        return <div className="text-center py-20 text-white text-2xl">Event not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl pt-24 pb-20 px-4 sm:px-0"
        >
            <button
                onClick={() => navigate(`/events/${clubId}`)}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-full w-max text-sm"
            >
                <ChevronLeft size={16} />
                Back to Events
            </button>

            {/* Banner */}
            <div className={`w-full h-48 md:h-64 rounded-3xl bg-gradient-to-r ${club.color} mb-12 shadow-2xl relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
                {event.image && (
                    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay z-0" />
                )}
                <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white px-6 text-center drop-shadow-lg tracking-tight">
                    {event.title}
                </h1>
            </div>

            {/* Embedded Rules Viewer or Text Rules */}
            {event.rulesDocument ? (
                <div className="w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden mb-12 flex flex-col">
                    {/* Browser Header Bar */}
                    <div className="bg-slate-800 p-3 border-b border-slate-700 flex items-center gap-3 relative">
                        <div className="flex gap-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto bg-slate-900 text-slate-400 text-xs px-4 py-1.5 rounded-md flex items-center justify-center min-w-[200px] border border-slate-700 shadow-inner truncate">
                            {event.rulesDocument.split('/').pop()}
                        </div>
                    </div>

                    {/* Scrollable Image Container */}
                    <div className="w-full bg-slate-950 relative h-[600px] overflow-y-auto">
                        <div className="w-full min-h-full flex items-center justify-center p-4">
                            <img
                                src={event.rulesDocument}
                                alt={`${event.title} Rules`}
                                className="w-full h-auto object-contain rounded-lg shadow-xl"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentNode.innerHTML = `<div class="text-slate-500 flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-xl w-full"><span>Could not load <b>${event.rulesDocument}</b>.</span></div>`
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-12">
                    <EventDetails event={event} club={club} />
                </div>
            )}

            {/* Registration Form (Now takes full width below the viewer) */}
            <div className="w-full max-w-3xl mx-auto">
                <RegistrationForm event={event} clubColor={club.color} />
            </div>
        </motion.div>
    );
};

export default EventDetailsPage;
