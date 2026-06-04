import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import HomeHealthArticles from './HomeHealthArticles';
import HomeExperts from './HomeExperts';
import HomeBrands from './HomeBrands';
import HomeDelivery from './HomeDelivery';
import brandImg from '../../assets/images/Home/brand.svg';
import expertImg from '../../assets/images/Home/expert.svg';
import deliveryImg from '../../assets/images/Home/delivery.svg';
import tipsImg from '../../assets/images/Home/health_tips.svg';
import HomeHighlights from './HomeHighlights';
import AboutSite from './AboutSite';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      if (error !== "Please Login to Access") {
        enqueueSnackbar(error, { variant: "error" });
      }
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Shree Kishan Aayushi | Premium Healthcare Assets & Clinical Protocols" />

      <main className="w-full mt-20 sm:mt-24 min-h-screen bg-slate-50 relative overflow-hidden">

        {/* Premium Medical Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
          <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-white/40 blur-[120px] rounded-full"></div>

          {/* Clinical Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
        </div>

        <div className="container-responsive relative z-10 flex flex-col gap-16 py-8 sm:py-16">

          {/* Banner Section */}
          <section className="animate-fade-in-up w-full rounded-[3.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white bg-white/40 backdrop-blur-2xl">
            <Banner />
          </section>



          {/* Why Choose Us - Premium Clinical Block */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <AboutSite
              variant="blue"
              image={brandImg}
              title="State-of-the-Art Clinical Care"
              description="We leverage advanced logistics and professional expertise to deliver a premium healthcare experience right to your fingertips."
              bullets={["100% SECURE PROTOCOL", "LIVE SPECIALIST SYNC", "EXPRESS CLINICAL DELIVERY"]}
            />
          </section>

          {/* Delivery & Support */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <HomeDelivery />
          </section>

          <section className="animate-fade-in-up mb-20" style={{ animationDelay: '1s' }}>
            <AboutSite
              variant="blue"
              image={deliveryImg}
              title="Vibrant Health Integration"
              description="Safe, fast, and secure delivery of your essential medical supplies. We prioritize your health with every shipment."
              bullets={["REAL-TIME ASSET TRACKING", "BIO-SECURE PACKAGING", "AUTOMATED RETURN PROTOCOLS"]}
            />
          </section>

        </div>
      </main>
    </>
  );
};

export default Home;