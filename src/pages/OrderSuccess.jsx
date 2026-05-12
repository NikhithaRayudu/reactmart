import { useParams, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-2">Your order ID is: <span className="font-bold">#{id}</span></p>
      <p className="text-gray-600 mb-8">We'll send you a confirmation email shortly.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/orders" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          View Orders
        </Link>
        <Link to="/" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
export default OrderSuccess;