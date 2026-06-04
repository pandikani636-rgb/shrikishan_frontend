import deliveryImg from '../../assets/images/Home/delivery.svg';

const HomeDelivery = () => {
    const steps = [
        { title: 'Order Confirmed', desc: 'We verify and process orders carefully.', step: '1' },
        { title: 'Packed Securely', desc: 'Items are packed to maintain integrity during transit.', step: '2' },
        { title: 'Delivered Fast', desc: 'Quick doorstep delivery with tracking updates.', step: '3' }
    ];

    return (
        <section className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4 px-4 sm:px-0">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Wellness <span className="text-emerald-600">Pipeline</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">End-to-end clinical grade chain of care</p>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <div className="w-12 h-1 bg-emerald-500/10 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-emerald-500 animate-slide-infinite"></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status: Seamless</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((s, i) => (
                    <div key={i} className="card-premium group relative bg-white/60">
                        <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 group-hover:text-emerald-500/10 transition-colors italic">{s.step}</div>

                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300">
                            <img src={deliveryImg} alt={s.title} className="w-10 h-10 object-contain" />
                        </div>

                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-2 group-hover:text-emerald-600 transition-colors">{s.title}</h3>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-wide opacity-80">{s.desc}</p>

                        <div className="mt-6 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full rounded-full opacity-30"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeDelivery;