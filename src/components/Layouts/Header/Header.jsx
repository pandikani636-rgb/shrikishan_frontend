import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import aayushiLogo from '../../../assets/images/logo1.jpg';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const location = useLocation();

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const prevCartCountRef = useRef(0);
  const dropdownRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartItems.length > prevCartCountRef.current && cartItems.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItems.length;
  }, [cartItems.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTogglePrimaryDropDown(false);
      }
    };

    if (togglePrimaryDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [togglePrimaryDropDown]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} ${isScrolled ? 'py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' : 'py-5 shadow-none'}`}>

      <div className="w-full sm:w-11/12 px-4 sm:px-12 m-auto flex justify-between items-center relative">

        <div className="flex items-center gap-12">
          <Link className="flex items-center group transform transition-all duration-700" to="/" onClick={closeMobileMenu}>
            <div className="relative">
              <div className="w-16 h-16 rounded-[2rem] bg-white border-2 border-blue-100 flex items-center justify-center p-1 shadow-2xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 overflow-hidden">
                <img draggable="false" className="w-full h-full object-contain relative z-10" src={aayushiLogo} alt="Shree Kishan Aayushi" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white animate-pulse shadow-lg"></div>
            </div>
            <div className="ml-6 hidden lg:block text-left">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:tracking-normal transition-all duration-700">
                Shree Kishan <span className="text-blue-500 ml-2">Aayushi</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-10 h-1 bg-blue-500 rounded-full"></span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none">Clinical Procurement</p>
              </div>
            </div>
          </Link>
        </div>

        {/* 💥 Desktop Navigation - Ultra Clean */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-14 relative">
          <nav className="flex items-center gap-8 xl:gap-14">
            {[
              { label: 'Home', path: '/', icon: <HomeIcon /> },
              { label: 'Products', path: '/products', icon: <CategoryIcon /> },
              { label: 'About', path: '/about', icon: <InfoIcon /> },
              { label: 'Contact', path: '/contact', icon: <ContactMailIcon /> }
            ].map((nav) => (
              <Link key={nav.path} to={nav.path} className={`group relative py-2 font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 ${location.pathname === nav.path ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
                {nav.label}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-blue-500 transition-all duration-700 rounded-full ${location.pathname === nav.path ? 'w-8' : 'w-0 group-hover:w-8'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="h-8 w-[1px] bg-slate-700 mx-2"></div>

          <Link to="/cart" className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-700 hover:bg-slate-800 border border-transparent hover:border-slate-700 group ${cartPulse ? 'animate-pulse scale-110' : ''}`}>
            <ShoppingCartIcon sx={{ fontSize: "22px", color: '#fff' }} className="group-hover:text-blue-400 transition-colors duration-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black rounded-lg w-5 h-5 flex items-center justify-center border-2 border-white shadow-xl">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group/user" ref={dropdownRef}>
              <div
                className="flex items-center gap-4 cursor-pointer pl-4 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-900/20 hover:border-blue-500 transition-all duration-700"
                onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <PersonIcon sx={{ fontSize: "18px" }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-[10px] uppercase tracking-tighter leading-none">{user.name && user.name.split(" ", 1)}</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Status</span>
                </div>
                {togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: 16, color: '#3b82f6' }} /> : <ExpandMoreIcon sx={{ fontSize: 16, color: '#94a3b8' }} />}
              </div>
              {togglePrimaryDropDown && (
                <div className="absolute top-[130%] right-0 w-64 animate-slideDown shadow-[0_30px_60px_rgba(15,82,186,0.15)] rounded-[2rem] overflow-hidden border border-blue-50">
                  <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all duration-700 bg-blue-600 text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-800 hover:-translate-y-1 active:scale-95">
              Secure Auth
            </Link>
          )}
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`w-7 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-7 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-7 h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

      </div >

      {/* 📱 Mobile Dropdown Menu */}
      < div className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-40 transition-all duration-500
        ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>

        <ul className="flex flex-col gap-4 py-5 px-6 text-gray-800 font-semibold">
          <li><Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-800"><HomeIcon sx={{ fontSize: "18px", color: 'inherit' }} /> Home</Link></li>
          <li><Link to="/about" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-800"><InfoIcon sx={{ fontSize: "18px", color: 'inherit' }} /> About</Link></li>
          <li><Link to="/products" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-800"><CategoryIcon sx={{ fontSize: "18px", color: 'inherit' }} /> Products</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-800"><ContactMailIcon sx={{ fontSize: "18px", color: 'inherit' }} /> Contact</Link></li>
          <li><Link to="/cart" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-800"><ShoppingCartIcon sx={{ fontSize: "18px", color: 'inherit' }} /> Cart ({cartItems.length})</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile" onClick={closeMobileMenu}>Profile</Link></li>
              <li><Link to="/orders" onClick={closeMobileMenu}>My Orders</Link></li>
            </>
          ) : (
            <li><Link to="/login" onClick={closeMobileMenu}>Login</Link></li>
          )}
        </ul>
      </div >

      {/* Dark Overlay */}
      {
        mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={closeMobileMenu}></div>
        )
      }

      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000 ${isScrolled ? 'w-full' : 'w-0'
        }`}></div>

    </header >
  );
};

export default Header;

