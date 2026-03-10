import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-slate-900/50 backdrop-blur-md border-b border-white/5 py-4 fixed top-0 z-50 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div
                    onClick={() => navigate('/')}
                    className="cursor-pointer flex items-center gap-2 group"
                >
                    <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg group-hover:scale-105 transition-transform border border-purple-500/30">
                        <Code2 className="text-pink-400" size={24} />
                    </div>
                    <span className="font-bold text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 transition-colors">
                        Dept. of Computer Applications
                    </span>
                </div>
                <div className="hidden sm:flex gap-6">
                    <button onClick={() => navigate('/events/next-gen')} className="text-sm text-slate-300 hover:text-white transition-colors">Next Gen Events</button>
                    <button onClick={() => navigate('/events/beyond-coders')} className="text-sm text-slate-300 hover:text-white transition-colors">Beyond Events</button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
