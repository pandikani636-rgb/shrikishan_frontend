import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';

const OrderItem = (props) => {

    const { orderId, name, image, price, quantity, createdAt, deliveredAt, orderStatus } = props;

    const BASE_URL = "http://localhost:4000/";

    // Construct proper image URL
    const getImageUrl = () => {
        if (!image) return "/default.png";

        const imageUrl = image?.url || image;

        // If it's already a full URL (starts with http/https), use it as is
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }

        // Otherwise, construct the full URL with BASE_URL
        return `${BASE_URL}admin/product/${imageUrl}`;
    };

    return (
        <Link to={`/order_details/${orderId}`} className="group flex flex-col md:flex-row p-8 items-center bg-white/80 backdrop-blur-3xl border border-blue-50 rounded-[2.5rem] gap-8 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>


            {/* Status Badge - Top Right Corner */}
            <div className="absolute top-6 right-6 z-10">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg ${orderStatus === 'Delivered'
                    ? 'bg-emerald-500'
                    : orderStatus === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`}>
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue">
                        {orderStatus}
                    </span>
                </div>
                <p className="text-[8px] font-bold text-gray-700 uppercase tracking-tight mt-1 text-right">
                    {orderStatus === "Delivered" ? "SUCCESSFULLY DELIVERED" : orderStatus === "Shipped" ? "IN TRANSIT" : "WE ARE PROCESSING YOUR ORDER"}
                </p>
            </div>



            {/* Image Section */}
            <div className="w-32 h-32 rounded-3xl bg-white p-4 border border-blue-50 shadow-inner group-hover:rotate-6 transition-all duration-700 flex-shrink-0">
                <img draggable="false" className="h-full w-full object-contain" src={getImageUrl()} alt={name} />
            </div>

            {/* Description Section */}
            <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-8">
                <div className="flex flex-col gap-2 max-w-md">
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-2">{name}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Qty: {quantity}</span>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Order ID: {orderId.substring(0, 10)}...</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:w-1/2">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Price</span>
                        <span className="text-lg font-black text-gray-900">₹{price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
