import MetaData from '../Layouts/MetaData';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const About = () => {
    const values = [
        {
            icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
            title: "Quality Care",
            description: "Trusted medical products sourced from certified global suppliers"
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
            title: "Fast Delivery",
            description: "Quick and reliable shipping with real-time tracking"
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: "Secure Platform",
            description: "Industry-leading encryption for every transaction"
        },
        {
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            title: "Expert Guidance",
            description: "Qualified healthcare professionals at your service 24/7"
        },
        {
            icon: <ThumbUpIcon sx={{ fontSize: 40 }} />,
            title: "Customer Centric",
            description: "Personalized care tailored to your unique wellness journey"
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
            title: "Global Standards",
            description: "Committed to excellence in international healthcare retail"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden">
            <MetaData title="Institutional Identity | Shree Kishan Aayushi" />

            {/* Premium Medical Mesh Background */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
            </div>

            <section className="container-responsive relative z-10 px-6 sm:px-12">

                {/* Hero Section */}
                <div className="text-center mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 mb-8 shadow-2xl shadow-blue-600/20 border-4 border-white animate-float">
                        <LocalHospitalIcon sx={{ fontSize: 32, color: 'white' }} />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-blue-950 mb-8 uppercase tracking-tighter leading-none">
                        Our Modern <span className="text-blue-600 italic">Clinical</span> Story
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
                        <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">Precision Healthcare Procurement</p>
                    </div>
                </div>

                {/* Vision & Mission Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-16 border border-blue-50 shadow-2xl shadow-blue-900/5 animate-fade-in-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                        <h2 className="text-lg font-black text-blue-950 mb-8 uppercase tracking-tighter border-l-4 border-blue-600 pl-6">The Vision</h2>
                        <p className="text-blue-900/60 font-medium text-xs leading-relaxed mb-8 italic">
                            Shree Kishan Aayushi was engineered from a fundamental mandate to synchronize premium pharmaceutical assets with institutional procurement nodes.
                        </p>
                        <p className="text-blue-900/40 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                            We don't just distribute products; we maintain the vitality of the healthcare ecosystem.
                        </p>
                    </div>

                    <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-16 border border-white/10 shadow-2xl shadow-blue-600/30 animate-fade-in-right relative overflow-hidden text-white group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 transition-transform duration-1000 group-hover:scale-150"></div>
                        <h2 className="text-lg font-black text-white mb-8 uppercase tracking-tighter border-l-4 border-white pl-6">The Mission</h2>
                        <p className="text-white text-sm font-medium leading-relaxed mb-10 italic">
                            "To optimize clinical procurement through technological innovation and absolute categorical integrity."
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                                <h3 className="text-blue-100 font-black uppercase text-[9px] tracking-widest mb-2">Protocol 01</h3>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">Verified Chain Accuracy</p>
                            </div>
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                                <h3 className="text-blue-100 font-black uppercase text-[9px] tracking-widest mb-2">Protocol 02</h3>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">Real-time Asset Sync</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Selection */}
                <div className="mb-32">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-xl font-black text-blue-950 uppercase tracking-tighter mb-4">Registry Standards</h2>
                        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 border border-blue-50 shadow-2xl shadow-blue-900/5 group transition-all duration-700 hover:-translate-y-2 hover:shadow-blue-900/10" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="text-blue-600 mb-8 flex justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110">
                                    {value.icon}
                                </div>
                                <h3 className="text-[10px] font-black text-blue-950 text-center mb-4 uppercase tracking-[0.2em]">{value.title}</h3>
                                <p className="text-blue-900/40 text-center text-xs font-bold uppercase leading-relaxed italic tracking-tighter">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white rounded-[4rem] p-16 md:p-24 border border-blue-50 shadow-2xl shadow-blue-900/5 animate-fade-in-up mb-32 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-400 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center relative z-10">
                        <div className="transition-all duration-700 hover:scale-110">
                            <p className="text-3xl md:text-5xl font-black text-blue-950 mb-3 tracking-tighter leading-none">10K<span className="text-blue-600 italic">+</span></p>
                            <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.3em]">Verified Assets</p>
                        </div>
                        <div className="transition-all duration-700 hover:scale-110">
                            <p className="text-3xl md:text-5xl font-black text-blue-950 mb-3 tracking-tighter leading-none">50K<span className="text-blue-600 italic">+</span></p>
                            <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.3em]">Active Personnel</p>
                        </div>
                        <div className="transition-all duration-700 hover:scale-110">
                            <p className="text-3xl md:text-5xl font-black text-blue-950 mb-3 tracking-tighter leading-none">24<span className="text-blue-600 italic">/</span>7</p>
                            <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.3em]">Live Monitoring</p>
                        </div>
                    </div>
                </div>

                {/* Final Commitment Panel */}
                <div className="bg-slate-100/50 backdrop-blur-3xl rounded-[4rem] p-16 border border-white shadow-inner animate-fade-in-up">
                    <h2 className="text-xl font-black text-blue-950 mb-16 text-center uppercase tracking-tighter italic">Institutional Commitment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {[
                            { label: "Absolute Integrity", desc: "Rigorous verification protocols for every procurement entry." },
                            { label: "Clinical Excellence", desc: "Practitioners with global medical distribution expertise." },
                            { label: "Network Velocity", desc: "Optimized logistics for precise clinical deployment." },
                            { label: "Nodal Security", desc: "Military-grade encryption for all registry data." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-6 p-8 bg-white/60 rounded-[2rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all duration-700 group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">
                                    <span className="text-xs">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-blue-950 mb-2 uppercase tracking-widest">{item.label}</h4>
                                    <p className="text-blue-900/30 text-[11px] font-black uppercase tracking-tighter italic">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
