import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2, Rocket } from 'lucide-react';
import ClubCard from '../components/ClubCard';
import { clubs } from '../data';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full flex-grow py-20"
        >
            <div className="text-center mb-16 pt-10">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2"
                >
                    Department of Computer Applications
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-slate-200 mb-2"
                >
                    Next Gen Coders and Beyond The Coders Clubs
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto italic"
                >
                    (An initiative under the Department of Computer Applications)
                </motion.p>
            </div>

            <div className="w-full max-w-5xl mb-8 flex flex-col items-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-sm md:text-md text-slate-400 mb-6 uppercase tracking-widest font-semibold text-center leading-relaxed"
                >
                    Official Events Organized by the Department of Computer Applications
                </motion.p>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-2xl font-bold text-white mb-2"
                >
                    Select a Club
                </motion.h3>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                <ClubCard
                    title={clubs[0].title}
                    description={clubs[0].description}
                    color={clubs[0].color}
                    icon={Code2}
                    image={clubs[0].image}
                    onClick={() => navigate('/events/next-gen')}
                    delay={0.6}
                />

                <ClubCard
                    title={clubs[1].title}
                    description={clubs[1].description}
                    color={clubs[1].color}
                    icon={Rocket}
                    image={clubs[1].image}
                    onClick={() => navigate('/events/beyond-coders')}
                    delay={0.8}
                />
            </div>
        </motion.div>
    );
};

export default HomePage;
