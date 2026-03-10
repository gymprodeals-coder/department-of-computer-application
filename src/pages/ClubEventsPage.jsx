import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { clubs, eventsData } from '../data';
import EventCard from '../components/EventCard';

const ClubEventsPage = () => {
    const { clubId } = useParams();
    const navigate = useNavigate();

    const club = clubs.find(c => c.id === clubId);
    const events = eventsData[clubId] || [];

    if (!club) {
        return <div className="text-white mt-20 text-center text-2xl">Club not found</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full py-12 pt-24"
        >
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-full w-max"
            >
                <ArrowLeft size={18} />
                Back to Home
            </button>

            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${club.color} pb-2`}
                >
                    {club.title} Events
                </motion.h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    {club.description} Explore our upcoming events and participate!
                </p>
            </div>

            {events.length === 0 ? (
                <div className="text-center text-slate-500 py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
                    No upcoming events at the moment. Check back later!
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            clubColor={club.color}
                            onClick={() => navigate(`/events/${clubId}/${event.id}`)}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ClubEventsPage;
