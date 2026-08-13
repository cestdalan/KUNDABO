import React, { createContext, useContext } from 'react';

type Language = 'en' | 'rw';

interface LanguageContextType {
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.shop': 'Shop',
    'nav.portfolio': 'Portfolio',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',

    // Hero
    'hero.badge': 'Premium Botanical Design',
    'hero.title': 'Elegant Landscape Design & Fresh Floral Artistry',
    'hero.desc': 'Transforming outdoor spaces and crafting bespoke floral arrangements in Kigali. Experience the perfect harmony of premium design and natural beauty.',
    'hero.explore': 'Explore Shop',

    // Services
    'services.badge': 'Professional Services',
    'services.title': 'Our Services',
    'services.desc': 'Tailored landscaping, garden maintenance, and bespoke floral installations for homes, events, and corporate spaces in Kigali.',
    'services.landscape': 'Landscape Design',
    'services.landscape.desc': 'Bespoke designs incorporating native Rwandan plants, stone paths, and elegant outdoor seating areas.',
    'services.floral': 'Floral Artistry',
    'services.floral.desc': 'Luxury bouquets, event installations, and weekly corporate arrangements handcrafted with local flowers.',
    'services.care': 'Garden Care & Maintenance',
    'services.care.desc': 'Regular pruning, weeding, pest control, and fertilization by certified horticultural experts.',
    'services.commercial': 'Commercial Greenery',
    'services.commercial.desc': 'Lush interior plants, vertical gardens, and landscape branding for office spaces and hotels.',
    'services.learnMore': 'Book Service',

    // Before & After
    'ba.badge': 'Our Portfolio',
    'ba.title': 'Before & After Transformations',
    'ba.desc': 'Witness the breathtaking transformations of residential gardens and commercial lawns in Kigali Heights and Nyarutarama.',
    'ba.hint': 'Drag slider to compare Before & After states',

    // How It Works
    'how.badge': 'Simple Process',
    'how.title': 'How It Works',
    'how.desc': 'Getting your premium flowers or scheduling a consultation is seamless.',
    'how.step1.title': '1. See what you like? Contact Us',
    'how.step1.desc': 'Select flowers from our Shop or contact us directly with your landscaping requirements.',
    'how.step2.title': '2. Pay & Confirm Order',
    'how.step2.desc': 'Instant payment confirmation via MTN MoMo, Card, or Bank transfer for smooth transactions.',
    'how.step3.title': '3. Fast Delivery in Kigali',
    'how.step3.desc': 'Same-day flower bouquets or custom landscaping team dispatch across Nyarutarama, Kimihurura, and Gacuriro.',

    // Products / Shop
    'shop.badge': 'Curated Shop Store',
    'shop.title': 'Curated Shop Store',
    'shop.desc': 'Browse our handpicked fresh bouquets, potted houseplants, designer glass vases, and premium florist tools.',
    'shop.all': 'All',
    'shop.plants': 'Plants',
    'shop.flowers': 'Flowers',
    'shop.vases': 'Vases',
    'shop.sort.featured': 'Featured',
    'shop.sort.lowToHigh': 'Price: Low to High',
    'shop.sort.highToLow': 'Price: High to Low',
    'shop.sort.topRated': 'Top Rated',
    'shop.explore': 'Explore Full Shop',
    'shop.addToCart': 'Add to Cart',
    'shop.added': 'Added!',
    'shop.back': 'Back to Home',

    // Testimonials
    'test.badge': 'Customer Love',
    'test.title': 'What Our Customers Say',
    'test.desc': 'Real stories from real people! See how our services have transformed their experiences.',
    'test.manual': 'Manual Control',
    'test.reset': 'Reset to Auto-Scroll',

    // Blog
    'blog.badge': 'Our Blog',
    'blog.title': 'Our Blog',
    'blog.visit': 'Visit our blog',
    'blog.readTime': 'minutes',
    'blog.continue': 'Continue Reading',

    // Contact Us
    'contact.badge': 'Get In Touch',
    'contact.title': 'Contact Us Today!',
    'contact.desc': 'Have a question or want to discuss a landscaping project? Contact our Kigali teams today.',
    'contact.hq': 'Kigali Head Office/Delivery Center',
    'contact.hq.addr': 'Kimihurura Garden Road, Kigali, Rwanda',
    'contact.heights': 'Kigali Heights Florist Corner',
    'contact.heights.addr': 'Kigali Heights, Floor 2, Kigali, Rwanda',
    'contact.nyarutarama': 'Nyarutarama Boutique Store',
    'contact.nyarutarama.addr': 'Nyarutarama Road, opposite MTN Center, Kigali, Rwanda',
    'contact.hours': 'Open daily: 8:00 AM - 8:00 PM',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.clear': 'Clear Cart',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Proceed to Checkout',

    // Booking Drawer
    'book.title': 'Book a Consultation',
    'book.desc': 'Fill out the form below and our horticultural designers will contact you within 24 hours.',
    'book.fullName': 'Full Name',
    'book.email': 'Email Address',
    'book.phone': 'Phone Number',
    'book.date': 'Preferred Date',
    'book.type': 'Consultation Type',
    'book.type.select': 'Select type',
    'book.type.landscape': 'Residential Landscaping',
    'book.type.commercial': 'Commercial & Corporate Greenery',
    'book.type.floral': 'Event & Wedding Floral Design',
    'book.type.maintenance': 'Garden Maintenance',
    'book.notes': 'Project Details / Notes',
    'book.notes.placeholder': 'Tell us about your space...',
    'book.submit': 'Submit Booking Request',
  },
  rw: {
    // Navbar
    'nav.home': 'Ahabanza',
    'nav.services': 'Serivisi',
    'nav.shop': 'Iduka',
    'nav.portfolio': 'Ibikorwa',
    'nav.testimonials': 'Ubuhamya',
    'nav.contact': 'Twandikire',

    // Hero
    'hero.badge': 'Igishushanyo Mbonera cy\'Ibihingwa',
    'hero.title': 'Imyubakire y\'Ubusitani Igezweho & Ubuhanzi bw\'Indabyo Nshya',
    'hero.desc': 'Guhundura ibibanza byo hanze no gukora gahunda z\'indabyo zihariye i Kigali. Umva ubwumvikane bwuzuye bw\'igishushanyo mbonera n\'ubwiza karemano.',
    'hero.explore': 'Vumbura Iduka',

    // Services
    'services.badge': 'Serivisi z\'Umwuga',
    'services.title': 'Serivisi Zacu',
    'services.desc': 'Imyubakire y\'ubusitani ihuye n\'ibyifuzo byawe, kwita ku busitani, no gushyira indabyo zihariye mu nzu, mu birori, no mu bigo i Kigali.',
    'services.landscape': 'Igishushanyo cy\'Ubusitani',
    'services.landscape.desc': 'Igishushanyo cyihariye kirimo ibimera byo mu Rwanda, inzira z\'amabuye, n\'imyanya myiza yo kwicara hanze.',
    'services.floral': 'Ubuhanzi bw\'Indabyo',
    'services.floral.desc': 'Indabyo nziza cyane, imitako y\'ibirori, n\'imitako y\'indabyo ya buri cyumweru ikozwe n\'indabyo zaho.',
    'services.care': 'Kwita ku Busitani',
    'services.care.desc': 'Kugabanya amashami, kurandura ibyatsi bibi, kurwanya ibyonnyi, no gushyiramo ifumbire bikozwe n\'inzobere zacu.',
    'services.commercial': 'Ibimera by\'Ubucuruzi',
    'services.commercial.desc': 'Ibimera byiza byo mu nzu, ubusitani buhagaze ku nkuta, n\'ibirango by\'ubusitani bw\'ibiro n\'amahoteli.',
    'services.learnMore': 'Saba Serivisi',

    // Before & After
    'ba.badge': 'Ibyo Twakoze',
    'ba.title': 'Impinduka z\'Ubusitani Mbere na Nyuma',
    'ba.desc': 'Reba impinduka zitangaje z\'ubusitani bw\'ingo n\'ibigo by\'ubucuruzi muri Kigali Heights n\'i Nyarutarama.',
    'ba.hint': 'Kurura akanyenyeri kugira ngo ugereranye Mbere na Nyuma',

    // How It Works
    'how.badge': 'Uburyo Bworoshye',
    'how.title': 'Uko Bikora',
    'how.desc': 'Kubona indabyo zawe nziza cyane cyangwa gutegura inama biroroshye.',
    'how.step1.title': '1. Ubonye ibyo ukunze? Twandikire',
    'how.step1.desc': 'Hitamo indabyo mu Iduka ryacu cyangwa utwandikire ako kanya utubwire ibyo ubusitani bwawe bukeneye.',
    'how.step2.title': '2. Ishyura kandi Wemeze Icyo Uguze',
    'how.step2.desc': 'Kwemeza ubwishyu ako kanya binyuze kuri MTN MoMo, Ikarita, cyangwa Banki kugira ngo ibintu bigende neza.',
    'how.step3.title': '3. Kugezwaho Vuba i Kigali',
    'how.step3.desc': 'Indabyo zigezwa ku munsi umwe cyangwa kohereza itsinda ry\'abakozi bacu b\'ubusitani muri Nyarutarama, Kimihurura, na Gacuriro.',

    // Products / Shop
    'shop.badge': 'Iduka Ryatoranyijwe',
    'shop.title': 'Iduka Ryatoranyijwe',
    'shop.desc': 'Reba indabyo zacu nshya zatoranyijwe, ibimera byo mu nzu, amavaze y\'ibirahure, n\'ibikoresho by\'indabyo byiza.',
    'shop.all': 'Zose',
    'shop.plants': 'Ibimera',
    'shop.flowers': 'Indabyo',
    'shop.vases': 'Amavaze',
    'shop.sort.featured': 'Ibyatoranyijwe',
    'shop.sort.lowToHigh': 'Igiciro: Hasi bijya hejuru',
    'shop.sort.highToLow': 'Igiciro: Hejuru bijya hasi',
    'shop.sort.topRated': 'Ibyakunzwe cyane',
    'shop.explore': 'Sura Iduka Ryose',
    'shop.addToCart': 'Shyira mu Karita',
    'shop.added': 'Byashyizwemo!',
    'shop.back': 'Subira Ahabanza',

    // Testimonials
    'test.badge': 'Urukundo rw\'Abakiriya',
    'test.title': 'Ibyo Abakiriya Bacu Bavuga',
    'test.desc': 'Inkuru z\'ukuri z\'abantu nyabo! Reba uko serivisi zacu zahinduye ubusitani bwabo.',
    'test.manual': 'Kwifasha',
    'test.reset': 'Subiza kuri Auto-Scroll',

    // Blog
    'blog.badge': 'Ikinyamakuru Cyacu',
    'blog.title': 'Ikinyamakuru Cyacu',
    'blog.visit': 'Sura ikinyamakuru',
    'blog.readTime': 'iminota',
    'blog.continue': 'Komeza Usome',

    // Contact Us
    'contact.badge': 'Tuvugishe',
    'contact.title': 'Twandikire Uyu Munsi!',
    'contact.desc': 'Ufite ikibazo cyangwa urashaka ko tuganira ku mushinga w\'ubusitani? Vugana n\'amatsinda yacu i Kigali uyu munsi.',
    'contact.hq': 'Ibiro Bikuru bya Kigali / Aho Tugeza Ibicuruzwa',
    'contact.hq.addr': 'Kimihurura Garden Road, Kigali, Rwanda',
    'contact.heights': 'Kigali Heights Ahacururizwa Indabyo',
    'contact.heights.addr': 'Kigali Heights, Floor 2, Kigali, Rwanda',
    'contact.nyarutarama': 'Nyarutarama Boutique Store',
    'contact.nyarutarama.addr': 'Nyarutarama Road, imbere ya MTN Center, Kigali, Rwanda',
    'contact.hours': 'Rufungura buri munsi: 8:00 AM - 8:00 PM',

    // Cart
    'cart.title': 'Akaseke k\'Ibihahwa',
    'cart.empty': 'Akaseke kawe karimo ubusa',
    'cart.clear': 'Siba Karita',
    'cart.subtotal': 'Igiteranyo',
    'cart.checkout': 'Komeza Kwishyura',

    // Booking Drawer
    'book.title': 'Saba Inama',
    'book.desc': 'Uzuza ifishi ikurikira kandi abashushanyi bacu b\'ubusitani bazakuvugisha mu masaha 24.',
    'book.fullName': 'Amazina Yombi',
    'book.email': 'Imeyili Address',
    'book.phone': 'Numero ya Terefone',
    'book.date': 'Umunsi Uhitamo',
    'book.type': 'Ubwoko bw\'Inama',
    'book.type.select': 'Hitamo ubwoko',
    'book.type.landscape': 'Igishushanyo cy\'Ubusitani bw\'Urugo',
    'book.type.commercial': 'Igishushanyo cy\'Ubusitani bw\'Ibigo',
    'book.type.floral': 'Indabyo z\'Ibirori & Ubukwe',
    'book.type.maintenance': 'Kwita ku Busitani',
    'book.notes': 'Ibisobanuro by\'Umushinga',
    'book.notes.placeholder': 'Tubwire ku mwanya wawe...',
    'book.submit': 'Yohereza Ubusabe bwawe',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
