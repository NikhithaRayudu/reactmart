import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center p-10">Product not found</p>;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Link to="/" className="text-blue-600 mb-4 inline-block hover:underline">← Back to Products</Link>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <img
            src={product.images[selectedImg]}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => e.target.src = 'https://via.placeholder.com/500'}
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setSelectedImg(idx)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${selectedImg === idx? 'border-blue-600' : 'border-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-500 mb-2">{product.category.name}</p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-4xl font-bold text-blue-600 mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Add to Cart
          </button>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-bold text-xl mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">John D.</span>
                  <span className="text-yellow-400">★★★★★</span>
                </div>
                <p className="text-gray-600">Great product! Quality is amazing.</p>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Sarah M.</span>
                  <span className="text-yellow-400">★★★★☆</span>
                </div>
                <p className="text-gray-600">Good value for money. Fast delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;