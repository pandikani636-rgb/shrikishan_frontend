import { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';

const footerLinks = [
  {
    title: "about",
    links: [
      { name: "Contact Us", redirect: "#" },
      { name: "About Shree Kishan Aayushi", redirect: "#" },
      { name: "Careers", redirect: "#" },
      { name: "Health Blog", redirect: "#" },
      { name: "Press", redirect: "#" },
      { name: "Pharmacy Network", redirect: "#" },
      { name: "Corporate Information", redirect: "#" }
    ]
  },
  {
    title: "help",
    links: [
      { name: "Payments", redirect: "#" },
      { name: "Medicine Delivery", redirect: "#" },
      { name: "Returns & Refunds", redirect: "#" },
      { name: "FAQ", redirect: "#" }
    ]
  },
  {
    title: "policy",
    links: [
      { name: "Return Policy", redirect: "#" },
      { name: "Terms Of Use", redirect: "#" },
      { name: "Security", redirect: "#" },
      { name: "Privacy Policy", redirect: "#" },
      { name: "Medicine Safety", redirect: "#" },
      { name: "Prescription Policy", redirect: "#" }
    ]
  },
  {
    title: "social",
    links: [
      { name: "Facebook", redirect: "#" },
      { name: "Twitter", redirect: "#" },
      { name: "YouTube", redirect: "#" }
    ]
  }
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <footer className="w-full bg-slate-900 px-4 md:px-0 py-24 relative overflow-hidden no-print">

          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05] pointer-events-none"></div>

          <div className="container-responsive relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-20">

              {/* Brand Presence - Level 1 */}
              <div className="lg:col-span-5 space-y-10">
                <div className="flex flex-col gap-4">
                  <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Shree Kishan <span className="text-blue-500">Aayushi</span>
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-glow-blue"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Nodal Network v12.4</span>
                  </div>
                </div>
                <p className="text-white/90 text-sm font-bold leading-relaxed max-w-md italic border-l-2 border-blue-500/50 pl-6">
                  "Advancing the frontier of clinical accessibility through digital integration. Your primary partner in medical designation and procurement."
                </p>
                <div className="flex gap-4">
                  {[FacebookIcon, TwitterIcon].map((Icon, i) => (
                    <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all duration-700 shadow-xl group">
                      <Icon sx={{ fontSize: 24 }} className="group-hover:scale-125 transition-transform duration-500" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Navigation - Level 2 */}
              <div className="lg:col-span-3 space-y-10">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Resource Indices</h3>
                <ul className="space-y-4">
                  {['Institutional Catalog', 'Operation Centers', 'Clinical Safety', 'Legal Protocols'].map((link) => (
                    <li key={link} className="group">
                      <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-all duration-500 flex items-center gap-3">
                        <span className="w-0 h-px bg-blue-600 group-hover:w-6 transition-all duration-500"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Access - Level 3 */}
              <div className="lg:col-span-4 space-y-10">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Operations Center</h3>
                <div className="grid grid-cols-1 gap-8">
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/2 border border-blue-100/5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold">HQ</div>
                    <p className="text-[11px] font-black text-white/80 uppercase tracking-widest leading-relaxed">
                      Sector 09, Shree Kishan Aayushi Plaza,<br />Health Metropolis.
                    </p>
                  </div>
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/2 border border-blue-100/5 group hover:bg-blue-600/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">TL</div>
                    <p className="text-xl font-black text-white tracking-tighter">+91 98765 00000</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Strategic Verification Footer */}
            <div className="pt-16 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-10 opacity-70 hover:opacity-100 transition-all duration-1000">
                <img src={paymentMethods} alt="Secured Payments" className="h-5 brightness-200" />
                <div className="h-6 w-px bg-white/40"></div>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">AES-256 Encrypted</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80 text-center lg:text-right">
                © 2024 Shree Kishan Aayushi Group. All rights reserved. Registered across 14 territories.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  )
};

export default Footer;