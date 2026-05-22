import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Star, ShoppingCart, Check, ArrowLeft, Heart, X, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS as SHOP_PRODUCTS } from '../data/products';

interface ShopPageProps {
  onBackToHome: () => void;
  onProductClick: (product: any) => void;
}

export default function ShopPage({ onBackToHome, onProductClick }: ShopPageProps) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [typedQuery, setTypedQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [selectedFlowerType, setSelectedFlowerType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});
  const [favorites, setFavorites] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const categories = ['All', 'Flowers', 'Plants', 'Vases'];
  const collectionsList = ['All', 'Birthday', 'Wedding', 'Funeral', 'Garden'];

  // YouTube-style search suggestions based on typed query
  const suggestions = useMemo(() => {
    if (!typedQuery.trim()) return [];
    const q = typedQuery.toLowerCase();
    const list = new Set<string>();
    
    // Match categories
    categories.forEach(cat => {
      if (cat.toLowerCase().includes(q) && cat !== 'All') {
        list.add(cat);
      }
    });
    
    // Match collections
    collectionsList.forEach(col => {
      if (col.toLowerCase().includes(q) && col !== 'All') {
        list.add(col);
      }
    });
    
    // Match product names
    SHOP_PRODUCTS.forEach(p => {
      if (p.name.toLowerCase().includes(q)) {
        list.add(p.name);
      }
      if (p.tag && p.tag.toLowerCase().includes(q)) {
        list.add(p.tag);
      }
    });

    return Array.from(list).slice(0, 8);
  }, [typedQuery]);

  const POPULAR_SEARCHES = useMemo(() => [
    'Flowering Peace Lily',
    'Spring Blossom Bouquet',
    'Terracotta Vase',
    'English Garden Rose'
  ], []);

  const activeSuggestions = useMemo(() => {
    if (!typedQuery.trim()) {
      return POPULAR_SEARCHES;
    }
    return suggestions;
  }, [typedQuery, suggestions, POPULAR_SEARCHES]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setTypedQuery(suggestion);
    setShowSuggestions(false);
  };

  // Render suggestion text bolding the predicted characters (YouTube style)
  const renderSuggestionText = (suggestion, query) => {
    if (!query.trim()) return <span>{suggestion}</span>;
    const index = suggestion.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <span>{suggestion}</span>;
    
    const before = suggestion.substring(0, index);
    const match = suggestion.substring(index, index + query.length);
    const after = suggestion.substring(index + query.length);
    
    return (
      <span className="text-emerald-950">
        {before && <span className="font-bold">{before}</span>}
        <span className="font-normal text-emerald-900/60">{match}</span>
        {after && <span className="font-bold">{after}</span>}
      </span>
    );
  };

  // Dynamically extract available flower types for flower tag selection
  const flowerTypes = useMemo(() => {
    const types = new Set<string>();
    SHOP_PRODUCTS.forEach(p => {
      if (p.category === 'Flowers' || p.type === 'Orchids') {
        types.add(p.type);
      }
    });
    return ['All', ...Array.from(types)];
  }, []);

  const handleAddToCartClick = (product, e) => {
    if (e) e.stopPropagation();
    addToCart(product, e);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
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
        p.type.toLowerCase().includes(q) ||
        p.collections.some(c => c.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Collection / Occasion filter
    if (selectedCollection !== 'All') {
      result = result.filter(p => p.collections && p.collections.includes(selectedCollection));
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
  }, [searchQuery, selectedCategory, selectedCollection, selectedFlowerType, sortBy]);

  return (
    <div className="bg-transparent min-h-screen text-left pb-28">
      {/* Shop Banner Top Section / Hero Section */}
      <div className="relative min-h-[45vh] flex items-center justify-center overflow-hidden py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat select-none"
            style={{ 
              backgroundImage: 'url("/shop_header.jpg")',
              backgroundAttachment: 'fixed'
            }}
            aria-label="Verdant Shop Hero Banner"
          />
          {/* Soft, rich gradient overlay using theme primary/green colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full space-y-6">
          {/* Back navigation */}
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors focus:outline-none group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-accent uppercase tracking-widest bg-white/10 border border-white/15 px-3 py-1.5 rounded-full inline-block backdrop-blur-md">
                Verdant Garden
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Boutique Collection
              </h1>
              <p className="font-sans text-sm sm:text-base text-emerald-100/80 font-light max-w-xl">
                Browse our fresh blooms, seasonal bouquets, handpicked houseplants, ceramic pots, and artisan garden decorations.
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 px-4 py-2.5 rounded-xl shadow-lg self-start md:self-auto min-w-[200px] backdrop-blur-md">
              <SlidersHorizontal className="w-4 h-4 text-emerald-200" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-white bg-transparent outline-none w-full cursor-pointer"
              >
                <option value="featured" className="text-emerald-950">Sort by: Featured</option>
                <option value="price-low" className="text-emerald-950">Price: Low to High</option>
                <option value="price-high" className="text-emerald-950">Price: High to Low</option>
                <option value="rating" className="text-emerald-950">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        
        {/* 🔍 Search Bar with Live Suggestions */}
        <div className="relative w-full max-w-2xl mx-auto mb-12 z-30">
          <div className="flex items-center w-full rounded-full water-glass shadow-lg border border-emerald-900/15 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 overflow-hidden relative">
            
            {/* Search icon inside the input area (conditional shift) */}
            <div className="relative flex-1 flex items-center">
              <div className={`absolute left-5 flex items-center justify-center transition-all duration-300 ${isFocused || searchQuery ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'}`}>
                <Search className="w-4.5 h-4.5 text-emerald-850/50" />
              </div>
              <input
                type="text"
                placeholder="Search flowers, plants, vases, collections..."
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setTypedQuery(val);
                  setShowSuggestions(true);
                  setActiveSuggestionIndex(-1);
                }}
                onFocus={() => {
                  setIsFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (activeSuggestions.length === 0) return;
                    setActiveSuggestionIndex(prev => {
                      const next = Math.min(prev + 1, activeSuggestions.length - 1);
                      if (next >= 0 && next < activeSuggestions.length) {
                        setSearchQuery(activeSuggestions[next]);
                      }
                      return next;
                    });
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (activeSuggestions.length === 0) return;
                    setActiveSuggestionIndex(prev => {
                      const next = Math.max(prev - 1, -1);
                      if (next === -1) {
                        setSearchQuery(typedQuery);
                      } else if (next >= 0 && next < activeSuggestions.length) {
                        setSearchQuery(activeSuggestions[next]);
                      }
                      return next;
                    });
                  } else if (e.key === 'Enter') {
                    if (activeSuggestionIndex >= 0 && activeSuggestionIndex < activeSuggestions.length) {
                      const selection = activeSuggestions[activeSuggestionIndex];
                      setSearchQuery(selection);
                      setTypedQuery(selection);
                    }
                    setShowSuggestions(false);
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className={`w-full bg-transparent py-4 outline-none text-emerald-950 placeholder-emerald-900/40 text-base font-sans font-medium transition-all ${
                  isFocused || searchQuery ? 'pl-12 pr-12' : 'pl-6 pr-12'
                }`}
              />
              
              {/* Clear Button */}
              {searchQuery && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery('');
                    setTypedQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 p-1.5 rounded-full hover:bg-emerald-900/10 text-emerald-800/60 hover:text-emerald-950 transition-colors cursor-pointer shrink-0"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* YouTube-style Search Button on the Right */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowSuggestions(false);
              }}
              className="bg-emerald-900/5 hover:bg-emerald-900/10 active:bg-emerald-900/15 text-emerald-900 px-6 py-4.5 border-l border-emerald-900/10 transition-colors flex items-center justify-center cursor-pointer shrink-0 self-stretch"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* YouTube-style Suggestions Dropdown */}
          {showSuggestions && activeSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-3xl water-glass shadow-2xl overflow-hidden border border-emerald-900/15 backdrop-blur-3xl z-40 max-h-[360px] overflow-y-auto">
              <div className="py-3">
                {/* Header for Popular Searches */}
                {!typedQuery.trim() && (
                  <div className="px-5 py-1.5 text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-accent animate-pulse" />
                    <span>Popular Searches</span>
                  </div>
                )}
                
                {activeSuggestions.map((suggestion, idx) => {
                  const isSelected = idx === activeSuggestionIndex;
                  return (
                    <button
                      key={suggestion}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-sans flex items-center gap-3 transition-all duration-150 ${
                        isSelected 
                          ? 'bg-primary/10 text-emerald-950 font-semibold pl-6 border-l-4 border-accent' 
                          : 'text-emerald-900/80 hover:bg-primary/5 hover:text-emerald-950 border-l-4 border-transparent'
                      }`}
                    >
                      {!typedQuery.trim() ? (
                        <TrendingUp className="w-4 h-4 text-accent/70 shrink-0" />
                      ) : (
                        <Search className="w-4 h-4 text-emerald-800/40 shrink-0" />
                      )}
                      <span className="flex-1 truncate">
                        {renderSuggestionText(suggestion, typedQuery)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Filter Controls (Categories, Collections & Flowers Sub-types) */}
        <div className="space-y-6 mb-12">
          
          {/* Category Tabs */}
          <div className="border-b border-emerald-900/5 pb-4">
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar select-none w-full">
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
                      : 'water-glass text-emerald-900/60 hover:text-primary shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Occasions / Collections Row */}
          <div className="water-glass rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-widest">
              Filter by Collection / Occasion
            </h3>
            <div className="flex flex-wrap gap-2">
              {collectionsList.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none cursor-pointer ${
                    selectedCollection === col
                      ? 'bg-emerald-950 text-white shadow-sm'
                      : 'bg-white/60 hover:text-emerald-950 border border-white/40 shadow-sm backdrop-blur-sm'
                  }`}
                >
                  {col === 'All' ? '🌸 All Occasions' : col === 'Birthday' ? '🎂 Birthday' : col === 'Wedding' ? '💍 Wedding' : col === 'Funeral' ? '🕊️ Funeral & Sympathy' : '🏡 Garden & Patio'}
                </button>
              ))}
            </div>
          </div>

          {/* Flowers subcategories / "Types of Flowers" (Visible when category is All or Flowers) */}
          {(selectedCategory === 'All' || selectedCategory === 'Flowers') && (
            <div className="water-glass rounded-3xl p-5 shadow-sm">
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
                        : 'bg-white/60 hover:bg-emerald-100/70 border border-white/30 text-emerald-900/60 backdrop-blur-sm'
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
          <div className="text-center py-20 water-glass rounded-3xl shadow-sm">
            <p className="text-emerald-950 font-bold text-lg">No products found</p>
            <p className="text-emerald-900/50 text-sm mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onProductClick && onProductClick(product)}
                  className="group relative flex flex-col justify-between p-4 rounded-3xl water-glass transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer text-left"
                >
                  {/* Floating Tags */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md text-[9px] font-bold text-accent uppercase tracking-widest">
                      {product.tag}
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 flex items-center justify-center text-emerald-900/40 hover:text-red-500 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
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
                      onClick={(e) => handleAddToCartClick(product, e)}
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
