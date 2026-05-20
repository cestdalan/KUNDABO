import React, { useState } from 'react';
import { Star, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';


const PRODUCTS = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa (Swiss Cheese)',
    category: 'Plants',
    price: 45.00,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller',
  },
  {
    id: 'rose_bush',
    name: 'English Garden Rose Bush',
    category: 'Plants',
    price: 28.00,
    rating: 4.7,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tag: 'Outdoor Bloom',
  },
  {
    id: 'spring_bouquet',
    name: 'Spring Blossom Hand-Tied Bouquet',
    category: 'Flowers',
    price: 49.99,
    rating: 4.9,
    reviews: 242,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    tag: 'Fresh Cut',
  },
  {
    id: 'pastel_meadow',
    name: 'Pastel Meadow Bouquet',
    category: 'Flowers',
    price: 55.00,
    rating: 4.8,
    reviews: 72,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    tag: 'Seasonal Special',
  },
  {
    id: 'terracotta_vase',
    name: 'Terracotta Ribbed Organic Vase',
    category: 'Vases',
    price: 32.00,
    rating: 4.9,
    reviews: 115,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80',
    tag: 'Artisanal',
  },
  {
    id: 'bud_vases',
    name: 'Amber Glass Bud Vases (Set of 3)',
    category: 'Vases',
    price: 38.00,
    rating: 4.6,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1595166290074-a6900ee9497d?auto=format&fit=crop&w=800&q=80',
    tag: 'Set of 3',
  },
  {
    id: 'brass_trowel',
    name: 'Ergonomic Brass Hand Trowel',
    category: 'Tools',
    price: 22.00,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80',
    tag: 'Walnut Handle',
  },
  {
    id: 'organic_feed',
    name: 'Organic Flower Booster Feed',
    category: 'Tools',
    price: 16.99,
    rating: 4.7,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80',
    tag: 'Bio-Nutrient',
  },
];

export default function Products({ onExploreShop }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [addedItems, setAddedItems] = useState({}); // Tracking added status for micro-animations

  const categories = ['All', 'Plants', 'Flowers', 'Vases', 'Tools'];

  const handleAddToCartClick = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Filtering products
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured order
  });

  return (
    <section id="shop" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
              Verdant Boutique
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
              Curated Garden Store
            </h2>
            <p className="font-sans text-sm sm:text-base text-emerald-900/60 font-light">
              Browse our handpicked fresh bouquets, potted houseplants, designer glass vases, and premium florist tools.
            </p>
          </div>

          {/* Filtering and Sorting controls */}
          <div className="flex flex-wrap items-center gap-3 md:self-end">
            <div className="flex items-center gap-1 bg-emerald-50/50 p-1 rounded-xl border border-emerald-900/5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-emerald-900/60 hover:text-primary hover:bg-emerald-50/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-50/50 px-3 py-2 rounded-xl border border-emerald-900/5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-900/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-emerald-900/80 font-semibold focus:outline-none pr-2 cursor-pointer animate-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-emerald-900/5 bg-brand-bg hover:bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div>
                {/* Product Image Area */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-emerald-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-primary shadow-sm border border-emerald-900/5 uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="px-1.5 text-left space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-emerald-900/40">
                    <span>{product.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-sans text-sm md:text-base font-bold text-emerald-950 leading-tight group-hover:text-primary transition-colors min-h-[40px]">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Purchase Bar */}
              <div className="mt-4 pt-3.5 border-t border-emerald-900/5 flex items-center justify-between px-1.5">
                <span className="text-lg font-bold text-emerald-950">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCartClick(product)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    addedItems[product.id]
                      ? 'bg-secondary border-secondary text-white scale-95'
                      : 'bg-white hover:bg-primary border-emerald-900/10 hover:border-primary text-emerald-900/80 hover:text-white hover:shadow-md'
                  }`}
                  aria-label={`Add ${product.name} to shopping cart`}
                >
                  {addedItems[product.id] ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Shop CTA */}
        {onExploreShop && (
          <div className="mt-16 text-center">
            <button
              onClick={onExploreShop}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-950 text-white text-sm font-semibold hover:bg-emerald-900 transition-all shadow-md shadow-emerald-950/20 active:translate-y-[1px] cursor-pointer"
            >
              Explore Full Shop
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
