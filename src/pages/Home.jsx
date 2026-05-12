import { useState, useEffect } from 'react';
import { getAllProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [prodData, catData] = await Promise.all([getAllProducts(), getCategories()]);
      setProducts(prodData);
      setFilteredProducts(prodData);
      setCategories(catData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category!== 'all') {
      result = result.filter(p => p.category.id === parseInt(category));
    }
    if (sort === 'low-high') result.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') result.sort((a, b) => b.price - a.price);
    if (sort === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredProducts(result);
  }, [search, category, sort, products]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to ShopKart</h1>
        <p>Discover amazing products at best prices</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <select className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {filteredProducts.length === 0? (
        <p className="text-center text-gray-500 text-xl">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
};
export default Home;