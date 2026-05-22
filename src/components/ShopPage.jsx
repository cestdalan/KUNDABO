import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Star, ShoppingCart, Check, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SHOP_PRODUCTS = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa (Swiss Cheese)',
    category: 'Plants',
    type: 'Monstera',
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
    type: 'Roses',
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
    type: 'Bouquets',
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
    type: 'Bouquets',
    price: 55.00,
    rating: 4.8,
    reviews: 72,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    tag: 'Seasonal Special',
  },
  {
    id: 'crimson_roses',
    name: 'Crimson Desire Premium Roses (Dozen)',
    category: 'Flowers',
    type: 'Roses',
    price: 65.00,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tag: 'Romantic Choice',
  },
  {
    id: 'white_lilies',
    name: 'Pure White Lilies Box Arrangement',
    category: 'Flowers',
    type: 'Lilies',
    price: 42.00,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    tag: 'Sympathy & Grace',
  },
  {
    id: 'golden_tulips',
    name: 'Golden Sunburst Tulips Bouquet',
    category: 'Flowers',
    type: 'Tulips',
    price: 34.99,
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
    tag: 'Bright Day',
  },
  {
    id: 'royal_orchid',
    name: 'Royal Orchid Cascade (Double Spike)',
    category: 'Plants',
    type: 'Orchids',
    price: 75.00,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80',
    tag: 'Rare Exotic',
  },
  {
    id: 'sunset_carnations',
    name: 'Sunset Carnations Autumn Bunch',
    category: 'Flowers',
    type: 'Carnations',
    price: 29.00,
    rating: 4.6,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    tag: 'Charming Blooms',
  },
  {
    id: 'terracotta_vase',
    name: 'Terracotta Ribbed Organic Vase',
    category: 'Vases',
    type: 'Vases',
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
    type: 'Vases',
    price: 38.00,
    rating: 4.6,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1595166290074-a6900ee9497d?auto=format&fit=crop&w=800&q=80',
    tag: 'Set of 3',
  },
  {
    id: 'white_planter',
    name: 'Minimalist White Ceramic Planter',
    category: 'Vases',
    type: 'Vases',
    price: 26.00,
    rating: 4.8,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    tag: 'Indoor Deco',
  },
  {
    id: 'brass_trowel',
    name: 'Ergonomic Brass Hand Trowel',
    category: 'Tools',
    type: 'Tools',
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
    type: 'Tools',
    price: 16.99,
    rating: 4.7,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80',
    tag: 'Bio-Nutrient',
  },
];

export default function ShopPage({ onBackToHome }) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFlowerType, setSelectedFlowerType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});
  const [favorites, setFavorites] = useState({});

  const categories = ['All', 'Flowers', 'Plants', 'Vases', 'Tools'];

  // Dynamically extract available flower types for flower tag selection
  const flowerTypes = useMemo(() => {
    const types = new Set();
    SHOP_PRODUCTS.forEach(p => {
      if (p.category === 'Flowers' || p.type === 'Orchids') {
        types.add(p.type);
      }
    });
    return ['All', ...Array.from(types)];
  }, []);

  const handleAddToCartClick = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...SHOP_PRODUCTS];

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Flower type sub-filter
    if (selectedFlowerType !== 'All') {
      result = result.filter(p => p.type === selectedFlowerType);
    }

    // Sort sorting dropdown
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedFlowerType, sortBy]);

  return (
    <div className="py-28 bg-brand-bg min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-secondary hover:text-primary transition-colors focus:outline-none group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
              Verdant Shop
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
              Boutique Collection
            </h1>
            <p className="font-sans text-sm sm:text-base text-emerald-900/60 font-light max-w-xl">
              Browse our fresh blooms, seasonal bouquets, handpicked houseplants, ceramic pots, and artisan garden decorations.
            </p>
          </div>
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2.5 bg-white border border-emerald-900/5 px-4 py-2.5 rounded-xl shadow-sm self-start md:self-auto min-w-[200px]">
            <SlidersHorizontal className="w-4 h-4 text-emerald-900/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-emerald-950 bg-transparent outline-none w-full cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Controls (Search bar & Categories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Search and High-level Categories */}
          <div className="lg:col-span-12 flex flex-col md:flex-row gap-4 w-full">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search flowers, plants, vases, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-emerald-950 placeholder-emerald-900/30"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/30" />
            </div>

            {/* High-level Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar select-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // Reset flower sub-type if we move out of Flowers
                    if (cat !== 'Flowers' && cat !== 'All') {
                      setSelectedFlowerType('All');
                    }
                  }}
                  className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all focus:outline-none cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-white text-emerald-900/60 hover:text-primary border border-emerald-900/5 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Flowers subcategories / "Types of Flowers" (Visible when category is All or Flowers) */}
          {(selectedCategory === 'All' || selectedCategory === 'Flowers') && (
            <div className="lg:col-span-12 bg-white/70 border border-emerald-900/5 rounded-3xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-widest mb-3">
                Types of Flowers
              </h3>
              <div className="flex flex-wrap gap-2">
                {flowerTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFlowerType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all focus:outline-none cursor-pointer ${
                      selectedFlowerType === type
                        ? 'bg-secondary text-white shadow-sm'
                        : 'bg-emerald-50 text-emerald-900/60 hover:bg-emerald-100'
                    }`}
                  >
                    {type === 'All' ? 'All Flowers' : type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-emerald-900/5 rounded-3xl shadow-sm">
            <p className="text-emerald-950 font-bold text-lg">No products found</p>
            <p className="text-emerald-900/50 text-sm mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between p-4 rounded-3xl bg-white border border-emerald-900/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
                >
                  {/* Floating Tags */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md text-[9px] font-bold text-accent uppercase tracking-widest">
                      {product.tag}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-900/5 flex items-center justify-center text-emerald-900/40 hover:text-red-500 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <div className="space-y-4">
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-900/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Metadata & Title */}
                    <div className="space-y-1.5 px-1 text-left">
                      <span className="text-[9px] font-bold text-emerald-900/40 uppercase tracking-widest">
                        {product.category}
                      </span>
                      <h3 className="font-sans text-sm font-bold text-emerald-950 leading-tight line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="flex text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="font-semibold text-emerald-950">{product.rating}</span>
                        <span className="text-emerald-900/40 font-light">({product.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="pt-4 border-t border-emerald-900/5 mt-4 flex items-center justify-between px-1">
                    <span className="font-heading text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => handleAddToCartClick(product)}
                      className={`h-10 px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                        addedItems[product.id]
                          ? 'bg-accent/20 text-secondary'
                          : 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/10 active:translate-y-[1px]'
                      }`}
                    >
                      {addedItems[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
