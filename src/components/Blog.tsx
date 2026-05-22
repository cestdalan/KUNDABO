import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();

  const posts = [
    {
      id: 1,
      tag: 'Dear Lara, Relationship and L...',
      duration: '3',
      title: 'Dear Lara, Should I Tell My Friend I Caught His Fiancee Cheating?',
      snippet: "Question: I recently found out my friend's fiancee is cheating on him. Do I tell him? If I don't and he finds out I knew, wouldn't he see...",
      image: '/blog_relationship_1.png',
      link: '#'
    },
    {
      id: 2,
      tag: 'Everything Flowers and Gifts',
      duration: '2',
      title: 'Why Are Fresh Flowers Used For Weddings',
      snippet: 'Fresh flowers have long been an integral part of wedding ceremonies across cultures and continents. The tradition of adorning wedding...',
      image: '/blog_wedding_flowers.png',
      link: '#'
    },
    {
      id: 3,
      tag: 'Dear Lara, Relationship and L...',
      duration: '2',
      title: 'Dear Lara, I Found Out That My Wife Of 9 Years Was My Landlord',
      snippet: 'Question: I am a middle-aged man of average means. About 5 years ago, my wife kept urging us to move out of our flat to a different area...',
      image: '/blog_relationship_2.png',
      link: '#'
    }
  ];

  return (
    <section id="blog" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
              {t('blog.badge')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight">
              {t('blog.title')}
            </h2>
          </div>
          
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover text-sm font-semibold transition-all group"
          >
            <span>{t('blog.visit')}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group flex flex-col justify-between rounded-3xl water-glass p-5 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 text-left cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-emerald-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Meta Tags */}
                <div className="flex items-center justify-between text-[11px] font-bold tracking-tight mb-3">
                  <span className="text-primary bg-emerald-50/80 px-2.5 py-1 rounded-md">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-900/40">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.duration} {t('blog.readTime')}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-emerald-950 leading-tight group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>

                {/* Snippet */}
                <p className="font-sans text-sm text-emerald-900/60 font-light leading-relaxed mb-6 line-clamp-3">
                  {post.snippet}
                </p>
              </div>

              {/* Continue Reading Link */}
              <div className="pt-4 border-t border-emerald-900/5">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary tracking-wide hover:text-primary-hover group-hover:underline">
                  {t('blog.continue')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
