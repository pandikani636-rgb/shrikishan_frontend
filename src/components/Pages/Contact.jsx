import MetaData from '../Layouts/MetaData';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createContact } from '../../actions/contactusAction';
// import { NEW_CONTACTUS_RESET } from '../../constants/contactUsConstants';
import { NEW_CONTACTUS_RESET } from '../../constants/contactusConstants';
import Swal from 'sweetalert2'


const Contact = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, success, message } = useSelector(
        (state) => state.newContactus || {}
    );

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(createContact(formData));

        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
        });
    };

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: "Inquiry Received",
                text: "Our medical staff will be in touch shortly.",
                icon: "success"
            });

            const timer = setTimeout(() => {
                dispatch({ type: NEW_CONTACTUS_RESET });
            }, 100);

            return () => clearTimeout(timer);
        }

        if (error) {
            Swal.fire({
                title: "Transmission Failed",
                text: "Please verify your information and try again.",
                icon: "error",
                timer: 2000,
            });
        }
    }, [success, error, message, enqueueSnackbar, dispatch]);


    const contactInfo = [
        {
            icon: <EmailIcon sx={{ fontSize: 32 }} />,
            title: "Email Us",
            details: ["support@aayushihealth.com", "care@aayushihealth.com"],
            color: "from-blue-600 to-blue-400"
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 32 }} />,
            title: "Call Us",
            details: ["+91 9632587412", "+91 8778874770"],
            color: "from-emerald-600 to-emerald-400"
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
            title: "Visit Us",
            details: ["123 Medical Innovation Lane", "Health City, HC 12345"],
            color: "from-blue-700 to-blue-500"
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
            title: "Working Hours",
            details: ["Mon - Sun: 24/7", "Always available for you"],
            color: "from-emerald-700 to-emerald-500"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden">
            <MetaData title="Deployment Inquiries | Shree Kishan Aayushi" />

            {/* Premium Medical Mesh Background */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
            </div>

            <section className="container-responsive relative z-10">

                {/* Header */}
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 mb-8 shadow-2xl shadow-blue-600/20 border-4 border-white animate-float">
                        <EmailIcon sx={{ fontSize: 32, color: 'white' }} />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-blue-950 mb-6 uppercase tracking-tighter leading-none">
                        Get in <span className="text-blue-600 italic">Touch</span>
                    </h1>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
                        <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">We're Here to Help</p>
                    </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
                    {contactInfo.map((info, index) => (
                        <div key={index} className={`bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-blue-50 shadow-2xl shadow-blue-900/5 group transition-all duration-700 hover:-translate-y-2 hover:shadow-blue-900/10`} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 mb-8 transition-all duration-700 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12`}>
                                <div className="text-blue-600 group-hover:text-white">{info.icon}</div>
                            </div>
                            <h3 className="text-[10px] font-black text-blue-950 mb-4 uppercase tracking-widest">{info.title}</h3>
                            <div className="space-y-2">
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-blue-900/40 text-[11px] font-black transition-colors uppercase tracking-tight">{detail}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form & Support Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Inquiry Form */}
                    <div className="lg:col-span-3 bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-16 border border-blue-100 shadow-2xl shadow-blue-900/5 animate-fade-in-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-10 h-1.5 bg-blue-600 rounded-full"></div>
                            <h2 className="text-lg font-black text-blue-950 uppercase tracking-tighter">Send Us a Message</h2>
                        </div>

                        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-blue-900/30 uppercase tracking-widest ml-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name..."
                                        className={`w-full bg-blue-50/50 border ${errors.name ? 'border-red-500' : 'border-blue-100'} rounded-2xl px-6 py-5 text-blue-950 font-bold focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 placeholder:text-blue-900/20`}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.name}</p>}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-blue-900/30 uppercase tracking-widest ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className={`w-full bg-blue-50/50 border ${errors.email ? 'border-red-500' : 'border-blue-100'} rounded-2xl px-6 py-5 text-blue-950 font-bold focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 placeholder:text-blue-900/20`}
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-blue-900/30 uppercase tracking-widest ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    className={`w-full bg-blue-50/50 border ${errors.phone ? 'border-red-500' : 'border-blue-100'} rounded-2xl px-6 py-5 text-blue-950 font-bold focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 placeholder:text-blue-900/20`}
                                />
                                {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.phone}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-blue-900/30 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us how we can help you..."
                                    rows="5"
                                    className={`w-full bg-blue-50/50 border ${errors.message ? 'border-red-500' : 'border-blue-100'} rounded-3xl px-6 py-5 text-blue-950 font-bold focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 placeholder:text-blue-900/20 resize-none`}
                                />
                                {errors.message && <p className="text-red-500 text-[10px] font-bold mt-2 ml-2">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-blue-600/30 hover:bg-blue-800 transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
                            >
                                <SendIcon sx={{ fontSize: 18 }} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Support Sidebar */}
                    <div className="lg:col-span-2 space-y-10 animate-fade-in-right">
                        <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-12 border border-blue-50 shadow-2xl shadow-blue-900/5">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                                <h2 className="text-lg font-black text-blue-950 uppercase tracking-tighter">Why Choose Us</h2>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { title: "Quick Response", desc: "We respond to all inquiries within 4 hours." },
                                    { title: "Expert Support", desc: "Our experienced team is ready to help you." },
                                    { title: "Secure & Safe", desc: "All your information is kept safe and secure." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex gap-5 group hover:bg-white transition-all duration-500">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-blue-950 uppercase tracking-widest mb-1">{item.title}</h4>
                                            <p className="text-[11px] font-bold text-blue-900/30 leading-tight italic uppercase tracking-tighter">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[3.5rem] p-12 bg-blue-600 text-white relative overflow-hidden group shadow-2xl shadow-blue-600/30">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000"></div>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 relative z-10">Need Urgent Help?</h3>
                            <p className="text-blue-100 text-xs font-medium leading-relaxed mb-10 relative z-10 opacity-80 italic">
                                If you need urgent assistance or have an emergency, please contact our priority support team for immediate help.
                            </p>
                            <button className="relative z-10 w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-2xl hover:bg-blue-50 transition-all active:scale-95">
                                Contact Priority Support
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default Contact;
