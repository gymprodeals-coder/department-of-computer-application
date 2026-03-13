import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ListChecks, Send } from 'lucide-react';

const RegistrationForm = ({ event, clubColor }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        studentClass: '',
        year: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            name: formData.name,
            email: formData.email,
            mobile: formData.phone,
            department: formData.department,
            class: formData.studentClass,
            year: formData.year,
            event: event.title
        };

        const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycbzHcDzmPF2LJ-22-eQPaOppO_kQFXeGFiHhAbjKtUQ_khiAPQoN_JVHnCfsQ9lUp1HQ/exec";

        try {
            const response = await fetch(googleAppsScriptURL, {
                method: 'POST',
                mode: 'no-cors', // App script usually requires no-cors when called directly from client
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            // With 'no-cors', we won't get a transparent success status, but if it doesn't throw we assume success
            setSuccess(true);
            setFormData({
                name: '', email: '', phone: '', department: '', studentClass: '', year: ''
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sticky top-24 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Register Now</h3>

            {success ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/20 text-green-400 border border-green-500/30 p-4 rounded-xl text-center flex flex-col items-center gap-3"
                >
                    <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                        <ListChecks size={24} className="text-green-300" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white">Success!</h4>
                        <p className="text-sm">You have been registered for {event.title}.</p>
                    </div>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-slate-400 font-medium mb-1">Event Name</label>
                        <input type="text" readOnly value={event.title} className="w-full bg-slate-900 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-500 font-semibold cursor-not-allowed focus:outline-none transition-all text-sm shadow-inner" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 font-medium mb-1">Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 font-medium mb-1">Mobile Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm" placeholder="+1 234 567 8900" />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 font-medium mb-1">Department</label>
                        <input required type="text" name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm" placeholder="Computer Science" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-slate-400 font-medium mb-1">Class</label>
                            <input required type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm" placeholder="CSE-A" />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 font-medium mb-1">Year of Study</label>
                            <select required name="year" value={formData.year} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm appearance-none">
                                <option value="" disabled>Select</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full relative overflow-hidden flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all transform mt-6 ${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : `bg-gradient-to-r ${clubColor} hover:scale-[1.02] shadow-[0_0_20px_rgba(168,85,247,0.4)]`}`}
                    >
                        {isSubmitting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></motion.div>
                        ) : (
                            <>Register<Send size={18} /></>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default RegistrationForm;
