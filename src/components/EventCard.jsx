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
            className="cursor-pointer flex flex-col items-center justify-center bg-white rounded-xl shadow-lg transition-all duration-300 p-6"
        >
            {event.image ? (
                <img src={event.image} alt={event.title} className="w-48 h-48 object-contain mb-6" />
            ) : (
                <Calendar size={64} className="text-slate-400 mb-6" />
            )}

            <h3 className="text-xl font-bold text-slate-800 text-center">
                {event.title}
            </h3>
        </motion.div>
    );
};

export default EventCard;
