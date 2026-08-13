import React, { useState } from 'react';
import { Star, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';
import { useCart, ProductType } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface ProductsProps {
  onExploreShop?: () => void;
  onProductClick?: (product: ProductType) => void;
}

export default function Products({ onExploreShop, onProductClick }: ProductsProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({}); // Tracking added status for micro-animations

  const categories = ['All', 'Plants', 'Flowers', 'Vases'];

  const categoryTranslationMap: Record<string, string> = {
    'All': t('shop.all'),
    'Plants': t('shop.plants'),
    'Flowers': t('shop.flowers'),
    'Vases': t('shop.vases'),
  };

  const handleAddToCartClick = (product: ProductType, e: React.MouseEvent) => {
    e.stopPropagation();
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
    <section id="shop" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
              {t('shop.badge')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
              {t('shop.title')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-emerald-900/60 font-light">
              {t('shop.desc')}
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
                  {categoryTranslationMap[cat] || cat}
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
                <option value="featured">{t('shop.sort.featured')}</option>
                <option value="price-low">{t('shop.sort.lowToHigh')}</option>
                <option value="price-high">{t('shop.sort.highToLow')}</option>
                <option value="rating">{t('shop.sort.topRated')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick && onProductClick(product)}
              className="group relative min-w-0 flex flex-col justify-between rounded-3xl water-glass p-2.5 sm:p-4 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer text-left"
            >
              <div>
                {/* Product Image Area */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-emerald-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 px-2 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[9px] sm:text-[10px] font-bold text-primary shadow-sm border border-emerald-900/5 uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 px-1 text-left space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-emerald-900/40">
                    <span>{categoryTranslationMap[product.category] || product.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-sans text-[13px] sm:text-sm md:text-base font-bold text-emerald-950 leading-tight group-hover:text-primary transition-colors min-h-[40px] break-words">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Purchase Bar with Full Width "Add to Cart" Button */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-emerald-900/5 flex flex-col gap-2.5 px-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-900/45 font-medium">Price</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-950">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={(e) => handleAddToCartClick(product, e)}
                  className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs font-bold cursor-pointer ${
                    addedItems[product.id]
                      ? 'bg-secondary border-secondary text-white scale-95'
                      : 'bg-emerald-950 hover:bg-emerald-900 border-emerald-950 text-white hover:shadow-md'
                  }`}
                  aria-label={`Add ${product.name} to shopping cart`}
                >
                  {addedItems[product.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t('shop.added')}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>{t('shop.addToCart')}</span>
                    </>
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
              {t('shop.explore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
