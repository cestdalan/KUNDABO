import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Check, Heart, ShieldAlert, Sparkles, Sun, Droplets, Ruler, HelpCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage({ product, onBack, onProductClick }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  // Scroll to top when the product is opened/changed
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const handleAddToCart = (e) => {
    addToCart(product, e);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Get 4 related products (excluding the current product, matching category or type)
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  // Specific botanical/item info based on category
  const specifications = useMemo(() => {
    if (product.category === 'Plants') {
      return [
        { icon: Sun, title: 'Light Requirements', detail: 'Bright, indirect sunlight. Avoid direct afternoon rays.' },
        { icon: Droplets, title: 'Watering Cycle', detail: 'Water thoroughly when top inch of soil is dry. Approx. once a week.' },
        { icon: Ruler, title: 'Average Height', detail: '18" - 24" tall in planter.' },
        { icon: ShieldAlert, title: 'Pet Friendly', detail: 'Toxic to pets. Keep away from dogs and cats.' },
      ];
    } else if (product.category === 'Flowers') {
      return [
        { icon: Sun, title: 'Flower Care', detail: 'Trim stems at 45° angle. Add fresh cold water and flower food.' },
        { icon: Droplets, title: 'Hydration', detail: 'Change water every 2 days to maintain maximum blossom freshness.' },
        { icon: Ruler, title: 'Stem Length', detail: '14" - 16" hand-tied stems.' },
        { icon: ShieldAlert, title: 'Freshness Promise', detail: 'Sourced from organic flower beds, guaranteed fresh for 7 days.' },
      ];
    } else {
      return [
        { icon: Sun, title: 'Vase Material', detail: 'Artisanal mouth-blown soda lime glass or handmade terracotta clay.' },
        { icon: Droplets, title: 'Cleaning Care', detail: 'Hand wash with warm water and soft sponge. Not dishwasher safe.' },
        { icon: Ruler, title: 'Vase Dimensions', detail: '8" height x 4.5" diameter base.' },
        { icon: ShieldAlert, title: 'Durability', detail: 'Fragile. Heat resistant but avoid sudden temperature changes.' },
      ];
    }
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 text-left font-sans"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-primary transition-colors focus:outline-none group mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
        <span>Back to items</span>
      </button>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-6 relative w-full">
          <div className="water-glass rounded-3xl p-5 shadow-2xl relative overflow-hidden group">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-900/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {product.tag && (
              <span className="absolute top-8 left-8 z-10 px-4 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-[10px] font-bold text-accent uppercase tracking-widest border border-white/10 shadow-lg">
                {product.tag}
              </span>
            )}

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-8 right-8 z-10 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/50 flex items-center justify-center text-emerald-900/60 hover:text-red-500 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer shadow-md"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Details info */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-widest bg-emerald-950/80 border border-white/10 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md">
              🌿 {product.category} Boutique
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 leading-tight tracking-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? '' : 'opacity-40'}`} />
                ))}
              </div>
              <span className="font-semibold text-emerald-950">{product.rating}</span>
              <span className="text-emerald-900/40 font-light">({product.reviews || 48} verified reviews)</span>
            </div>
          </div>

          <div className="border-t border-b border-emerald-900/5 py-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-900/40 uppercase tracking-wider">Purchase Price</p>
              <p className="font-heading text-3xl font-bold text-primary mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`h-14 px-8 rounded-2xl flex items-center gap-2 text-sm font-bold transition-all focus:outline-none cursor-pointer shadow-lg active:translate-y-[1px] ${
                added
                  ? 'bg-accent/25 text-secondary border border-accent/40 scale-95'
                  : 'bg-primary hover:bg-primary-hover text-white shadow-primary/10 hover:shadow-primary/20'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Botanical Profile & Explanation</span>
            </h3>
            <p className="font-sans text-sm sm:text-base text-emerald-900/70 font-light leading-relaxed">
              {product.description || 'This premium item is hand-selected and carefully packed by our horticulturists. Sourced from sustainable fields, it embodies our commitment to organic growing practices, unique botanical styling, and absolute botanical fresh quality.'}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="water-glass rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-widest">
              Care & Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specifications.map((spec, i) => {
                const IconComponent = spec.icon;
                return (
                  <div key={i} className="flex gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-white/60 border border-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">{spec.title}</h4>
                      <p className="text-[11px] text-emerald-900/60 font-light mt-0.5 leading-tight">{spec.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 space-y-8">
          <div className="text-left">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              Related Floral Arrangements
            </h2>
            <p className="font-sans text-xs sm:text-sm text-emerald-900/50 font-light mt-1">
              Complete your garden collection or bouquet gift with these matching botanical pairs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => onProductClick(relProduct)}
                className="group relative flex flex-col justify-between p-4 rounded-3xl water-glass transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-emerald-50 border border-emerald-900/5">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {relProduct.tag && (
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[9px] font-bold text-primary border border-emerald-900/5 uppercase tracking-wider">
                        {relProduct.tag}
                      </span>
                    )}
                  </div>

                  <div className="px-1 text-left space-y-1">
                    <span className="text-[9px] font-bold text-emerald-900/40 uppercase tracking-widest">
                      {relProduct.category}
                    </span>
                    <h3 className="font-sans text-sm font-bold text-emerald-950 leading-tight line-clamp-2 min-h-[40px]">
                      {relProduct.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/5 flex items-center justify-between px-1">
                  <span className="font-bold text-primary">
                    ${relProduct.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(relProduct, e);
                    }}
                    className="p-2 rounded-lg bg-white/60 hover:bg-primary border border-emerald-900/10 text-emerald-900/80 hover:text-white transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
