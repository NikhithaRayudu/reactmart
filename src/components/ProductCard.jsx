import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-2xl transition-all duration-300 bg-white group">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
        />
        <h3 className="font-bold mt-3 text-lg truncate">{product.title}</h3>
      </Link>
      <p className="text-gray-500 text-sm">{product.category.name}</p>
      <p className="text-2xl font-bold mt-2 text-blue-600">${product.price}</p>
      <div className="flex gap-2 mt-4">
        <Link to={`/product/${product.id}`} className="bg-gray-200 text-gray-800 px-3 py-2 rounded text-center flex-1 hover:bg-gray-300 transition">
          View
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-3 py-2 rounded flex-1 hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;