import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen text-slate-100 selection:bg-purple-500/30">
            <Navbar />
            <main className="flex-grow flex flex-col items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
