import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { eventsData, clubs } from '../data';
import EventDetails from '../components/EventDetails';
import EventSchedule from '../components/EventSchedule';
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

            {/* Event Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white text-center drop-shadow-lg tracking-tight mb-12">
                {event.title}
            </h1>

            {/* Event Schedule Section */}
            <EventSchedule event={event} />

            {/* Event Description, Rules and Regulations Container */}
            <div className="mb-12">
                <EventDetails event={event} club={club} />
            </div>

            {/* Registration Form (Now takes full width below the viewer) */}
            <div className="w-full max-w-3xl mx-auto">
                <RegistrationForm event={event} clubColor={club.color} />
            </div>
        </motion.div>
    );
};

export default EventDetailsPage;
