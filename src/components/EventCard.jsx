import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const EventCard = ({ event, onClick }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="cursor-pointer flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl shadow-lg transition-all duration-300 p-6 hover:border-purple-500 hover:shadow-purple-500/20"
        >
            {event.image ? (
                <div className="w-28 h-28 flex items-center justify-center mb-4">
                    <img src={event.image} alt={event.title} className="max-w-full max-h-full object-contain" />
                </div>
            ) : (
                <div className="w-28 h-28 flex items-center justify-center mb-4">
                    <Calendar size={64} className="text-slate-400" />
                </div>
            )}

            <h3 className="text-lg font-semibold text-white text-center mt-4">
                {event.title}
            </h3>
        </motion.div>
    );
};

export default EventCard;
