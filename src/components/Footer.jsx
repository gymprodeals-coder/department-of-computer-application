import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-md pb-6 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                            Department of Computer Application
                        </h3>
                        <p className="text-slate-400 text-sm">Empowering the college tech community.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 hover:text-purple-400 transition-colors duration-300">
                            <Github size={20} />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 hover:text-pink-400 transition-colors duration-300">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 hover:text-blue-400 transition-colors duration-300">
                            <Linkedin size={20} />
                        </a>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <a href="mailto:hello@nextcodersclub.edu" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300">
                            <Mail size={16} />
                            <span className="text-sm">hello@nextcodersclub.edu</span>
                        </a>
                        <p className="text-slate-500 text-xs mt-2">© {new Date().getFullYear()} Next Coders Club. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
