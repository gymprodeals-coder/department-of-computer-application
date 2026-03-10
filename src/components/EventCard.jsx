import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const EventCard = ({ event, clubColor, onClick }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="cursor-pointer glass-card rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-800 hover:border-slate-600 bg-slate-900/60"
        >
            <div className={`h-32 bg-gradient-to-br ${clubColor} opacity-80 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <Calendar size={48} className="text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500 z-10" />
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-colors">
                    {event.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3">
                    {event.shortDescription}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-purple-400 group-hover:text-pink-400 transition-colors">
                    View Details &rarr;
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
