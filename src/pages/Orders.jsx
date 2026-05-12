import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500">Order ID: #{order.id}</p>
                <p className="text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {order.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">${order.total.toFixed(2)}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Items:</h3>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity} x ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;