import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import { getCategories } from '../../actions/categoryAction';
import { getSubCategories } from '../../actions/subCategoryAction';
import Loader from '../Layouts/Loader';
import Product from './Product';
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    // Filters
    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");
    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [priceToggle, setPriceToggle] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [onMobile, setOnMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const checkMobile = () => setOnMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
    const { categories: adminCategories } = useSelector(state => state.categories);
    const { subCategories } = useSelector(state => state.subCategories);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => setPrice(newPrice);

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setSelectedMainCategory("");
        setRatings(0);
        setMobileFiltersOpen(false);
        setSearchTerm('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products/${searchTerm}`);
        }
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            if (error !== "Please Login to Access") {
                enqueueSnackbar(error, { variant: "error" });
            }
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, category, price, ratings, currentPage));
    }, [dispatch, keyword, category, price, ratings, currentPage, error, enqueueSnackbar]);

    // Real-time search filter
    useEffect(() => {
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        if (!searchTerm.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const groupedSubCategories = subCategories?.reduce((acc, sub) => {
        const catId = sub.category?._id || sub.category;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(sub);
        return acc;
    }, {});

    return (
        <>
            <MetaData title="Premium Medical Catalog | Shree Kishan Aayushi" />

            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>

                    {/* Clinical Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="container-responsive relative z-10 py-8">

                    {/* Catalog Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                        <div className="animate-fade-in-left">
                            <h1 className="text-xl sm:text-3xl font-black text-blue-950 uppercase tracking-tighter mb-2 leading-none">Medical <span className="text-blue-600">Catalog</span></h1>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
                                <p className="text-blue-800/60 font-black uppercase tracking-widest text-[9px]">Verified Healthcare Solutions</p>
                            </div>
                        </div>

                        {/* Search Bar - Premium Clinical */}
                        <form onSubmit={handleSearch} className="w-full max-w-xl animate-fade-in-right">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search molecules, brands or devices..."
                                    className="w-full bg-white border border-blue-100 rounded-xl px-6 py-4 pl-14 text-blue-950 text-sm font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-500 placeholder:text-blue-900/20 shadow-sm"
                                />
                                <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-600 transition-colors" sx={{ fontSize: 20 }} />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filter Action - Mobile */}
                    <div className="lg:hidden mb-8 animate-fade-in-up">
                        <button
                            className="w-full glass-card border-white/10 rounded-xl p-4 flex items-center justify-between group"
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        >
                            <span className="font-black text-[10px] uppercase tracking-widest text-white">Refine Search</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                                    {(category ? 1 : 0) + (price[0] > 0 || price[1] < 200000 ? 1 : 0)} Active
                                </span>
                                <ExpandMoreIcon className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">

                        {/* Sidebar (Desktop) */}
                        <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 animate-fade-in-left sticky top-32">
                            <div className="bg-white/80 backdrop-blur-2xl border border-blue-100 rounded-[2rem] p-6 space-y-10 shadow-[0_20px_50px_rgba(15,82,186,0.05)]">
                                <div className="flex justify-between items-center border-b border-blue-50 pb-5">
                                    <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-blue-950">Refinement</h3>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-[9px] font-black transition-all uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
                                        onClick={clearFilters}
                                    >
                                        Clear
                                    </button>
                                </div>

                                {/* Price Filter */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center group cursor-pointer" onClick={() => setPriceToggle(!priceToggle)}>
                                        <h4 className="font-black text-[9px] uppercase text-blue-900/40 tracking-[0.2em] group-hover:text-blue-600 transition-colors">Economic Scope</h4>
                                        {priceToggle ? <ExpandLessIcon sx={{ fontSize: 16 }} className="text-blue-200" /> : <ExpandMoreIcon sx={{ fontSize: 16 }} className="text-blue-200" />}
                                    </div>
                                    {priceToggle && (
                                        <div className="animate-fade-in px-3">
                                            <Slider
                                                value={price}
                                                onChange={priceHandler}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={200000}
                                                sx={{
                                                    color: '#0f52ba',
                                                    '& .MuiSlider-thumb': {
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: '#fff',
                                                        border: '3px solid #0f52ba',
                                                        boxShadow: '0 4px 12px rgba(15,82,186,0.2)',
                                                    },
                                                    '& .MuiSlider-track': { height: 4, borderRadius: 2 },
                                                    '& .MuiSlider-rail': { height: 4, opacity: 0.1, backgroundColor: '#0f52ba', borderRadius: 2 },
                                                }}
                                            />
                                            <div className="flex justify-between mt-4 text-[9px] font-black text-blue-900/60 uppercase tracking-widest">
                                                <span>₹{price[0].toLocaleString()}</span>
                                                <span>₹{price[1].toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Categories Filter */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center group cursor-pointer" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <h4 className="font-black text-[9px] uppercase text-blue-900/40 tracking-[0.2em] group-hover:text-blue-600 transition-colors">Clinical Discipline</h4>
                                        {categoryToggle ? <ExpandLessIcon sx={{ fontSize: 16 }} className="text-blue-200" /> : <ExpandMoreIcon sx={{ fontSize: 16 }} className="text-blue-200" />}
                                    </div>
                                    {categoryToggle && (
                                        <div className="space-y-2 animate-fade-in">
                                            {adminCategories?.map((cat) => (
                                                <div key={cat._id} className="border-b border-blue-50 last:border-0 pb-2 last:pb-0">
                                                    <div
                                                        className={`flex items-center justify-between group cursor-pointer p-3 rounded-xl transition-all duration-500 ${selectedMainCategory === cat._id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-blue-50 text-blue-900/70'}`}
                                                        onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)}
                                                    >
                                                        <span className={`text-[10px] font-black uppercase tracking-widest`}>
                                                            {cat.name}
                                                        </span>
                                                        {selectedMainCategory === cat._id ?
                                                            <ExpandLessIcon sx={{ fontSize: 14 }} className="text-white" /> :
                                                            <ExpandMoreIcon sx={{ fontSize: 14 }} className="text-blue-200 group-hover:text-blue-400" />
                                                        }
                                                    </div>

                                                    {selectedMainCategory === cat._id && (
                                                        <div className="mt-2 ml-1 animate-fade-in space-y-1">
                                                            <FormControl component="fieldset" className="w-full">
                                                                <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                                                                    {groupedSubCategories[cat._id]?.map((sub) => (
                                                                        <FormControlLabel
                                                                            key={sub._id}
                                                                            value={sub.name}
                                                                            className="hover:bg-blue-50 rounded-lg pr-3 transition-all w-full m-0 mb-0.5"
                                                                            control={<Radio size="small" sx={{
                                                                                padding: '4px',
                                                                                color: 'rgba(15,82,186,0.1)',
                                                                                '&.Mui-checked': { color: '#0f52ba' }
                                                                            }} />}
                                                                            label={
                                                                                <span className={`text-[9px] font-black uppercase tracking-widest ${category === sub.name ? 'text-blue-600' : 'text-blue-900/40'}`}>
                                                                                    {sub.name}
                                                                                </span>
                                                                            }
                                                                        />
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Products List Grid */}
                        <section className="flex-1 w-full animate-fade-in-up">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="card-premium h-96 animate-pulse opacity-50 bg-white/50"></div>
                                    ))}
                                </div>
                            ) : products?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-3xl rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5">
                                    <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-8 border border-blue-100 animate-pulse">
                                        <SearchIcon sx={{ fontSize: 60, color: 'rgba(15,82,186,0.1)' }} />
                                    </div>
                                    <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tighter mb-4">No Diagnostics Matched</h2>
                                    <p className="text-blue-800/50 text-center max-w-sm font-bold leading-relaxed px-6 uppercase tracking-widest text-[9px]">Your query yielded zero biological results. Please adjust parameters.</p>
                                    <button onClick={clearFilters} className="mt-10 px-10 py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] hover:bg-blue-800 transition-all shadow-2xl shadow-blue-600/30 active:scale-95">Re-Sync Filters</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => <Product key={product._id} {...product} />)}
                                </div>
                            )}

                            {/* Pagination - Premium Clinical */}
                            {filteredProductsCount > resultPerPage && (
                                <div className="flex justify-center mt-20 mb-12">
                                    <Pagination
                                        count={Math.ceil(filteredProductsCount / resultPerPage)}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                        shape="rounded"
                                        size={onMobile ? "small" : "medium"}
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                color: '#0f52ba',
                                                fontFamily: 'inherit',
                                                fontWeight: '900',
                                                fontSize: '0.65rem',
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                borderRadius: '0.8rem',
                                                margin: '0 3px',
                                                border: '1px solid rgba(15,82,186,0.1)',
                                                background: '#fff',
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': { background: '#0f52ba', color: '#fff', transform: 'translateY(-2px)' },
                                                '&.Mui-selected': {
                                                    background: '#0f52ba',
                                                    color: 'white',
                                                    border: 'none',
                                                    boxShadow: '0 10px 20px rgba(15, 82, 186, 0.2)',
                                                    '&:hover': { background: '#083d8d' }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Mobile Filter Sheet Component */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-[100] sm:hidden animate-fade-in">
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a] rounded-t-[2.5rem] border-t border-white/10 p-8 max-h-[85vh] overflow-y-auto animate-slide-up">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-black text-white uppercase tracking-tighter">Refinement</h3>
                                <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white text-xs">✕</button>
                            </div>

                            <div className="space-y-10 pb-10">
                                <div className="space-y-4">
                                    <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Financial Range</h4>
                                    <Slider value={price} onChange={priceHandler} min={0} max={200000} sx={{ color: '#3b82f6' }} />
                                    <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                        <span>₹{price[0]}</span>
                                        <span>₹{price[1]}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Disciplines</h4>
                                    {adminCategories?.map(cat => (
                                        <div key={cat._id} className="space-y-4">
                                            <div onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)} className={`p-3 rounded-xl border ${selectedMainCategory === cat._id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5'} flex justify-between items-center`}>
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{cat.name}</span>
                                                <ExpandMoreIcon sx={{ fontSize: 18 }} className={`text-slate-500 transition-transform ${selectedMainCategory === cat._id ? 'rotate-180' : ''}`} />
                                            </div>
                                            {selectedMainCategory === cat._id && (
                                                <div className="grid grid-cols-1 gap-2 pl-3 animate-fade-in">
                                                    {groupedSubCategories[cat._id]?.map(sub => (
                                                        <div key={sub._id} onClick={() => setCategory(sub.name)} className={`p-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${category === sub.name ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-white/5 text-slate-500'}`}>
                                                            {sub.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => setMobileFiltersOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-600/20 active:scale-95">Verify Application</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Products;
