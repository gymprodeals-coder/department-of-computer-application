import React from 'react';
import { motion } from 'framer-motion';

const ClubCard = ({ title, description, color, icon: Icon, image, onClick, delay }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, translateY: -10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: delay === 0.6 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            onClick={onClick}
            className={`cursor-pointer group relative rounded-3xl p-1 bg-gradient-to-br ${color}`}
        >
            <div className={`absolute inset-0 bg-opacity-20 blur-xl rounded-3xl group-hover:bg-opacity-40 transition-all duration-500`}></div>
            <div className="relative h-full flex flex-col items-center justify-center p-12 bg-slate-950/80 backdrop-blur-xl rounded-[23px] text-center border border-white/5 shadow-2xl overflow-hidden">
                <div className={`absolute ${delay === 0.6 ? '-top-10 -right-10' : '-bottom-10 -left-10'} text-white/5 group-hover:text-white/10 transition-colors duration-500`}>
                    <Icon size={180} />
                </div>

                {image ? (
                    <div className="mb-8 z-10 w-24 h-24 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                        <img src={image} alt={title} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                ) : (
                    <>
                        <div className={`p-5 rounded-2xl bg-gradient-to-br mix-blend-screen opacity-20 border mb-8 shadow-2xl ${color}`}></div>
                        <div className="absolute top-[80px]">
                            <Icon size={48} className="text-white drop-shadow-md" />
                        </div>
                    </>
                )}

                <h2 className={`text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300 z-10 relative`}>
                    {title}
                </h2>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors z-10 relative">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default ClubCard;
