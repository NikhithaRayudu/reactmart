import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, getTotalPrice, checkout } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = checkout(form);
    navigate(`/order-success/${orderId}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <input type="text" placeholder="Full Name" required className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, email: e.target.value})} />
          <input type="text" placeholder="Address" required className="w-full border p-2 rounded"
            onChange={(e) => setForm({...form, address: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" required className="border p-2 rounded"
              onChange={(e) => setForm({...form, city: e.target.value})} />
            <input type="text" placeholder="ZIP Code" required className="border p-2 rounded"
              onChange={(e) => setForm({...form, zip: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
            Place Order
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;