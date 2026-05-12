import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">ShopKart</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/orders" className="hover:text-blue-400 transition">My Orders</Link>
          <Link to="/cart" className="relative hover:text-blue-400 transition">
            Cart ({getCartCount()})
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;