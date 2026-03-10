import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClubEventsPage from './pages/ClubEventsPage';
import EventDetailsPage from './pages/EventDetailsPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events/:clubId" element={<ClubEventsPage />} />
          <Route path="events/:clubId/:eventId" element={<EventDetailsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden font-sans relative">
        {/* Background decorations */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
