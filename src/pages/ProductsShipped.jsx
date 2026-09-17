import React from 'react';
import { productsShipped } from '../data/productsShipped';

export default function ProductsShipped() {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#111827]">Products Shipped</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productsShipped.map((product) => (
          <div key={product.id} className="relative overflow-hidden flex flex-col p-6 bg-white border border-[#e5e7eb] rounded-xl shadow-sm hover:shadow-md transition-shadow">
            
            {/* Top Content (Pill and Title) */}
            <div className="relative z-10 text-left mb-4">
              {/* Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full bg-[#ebf4ff] text-[#3b82f6] font-medium text-[11px] w-fit">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.6H22l-6 4.8 2.4 7.6-6-4.8-6 4.8 2.4-7.6-6-4.8h7.6z"/>
                </svg>
                {product.tag}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#111827] tracking-tight">
                {product.title}
              </h3>
            </div>

            {/* Image Area */}
            <div className="relative w-full flex justify-center items-center mb-4 py-4">
              {/* Organic Blue blob background */}
              <div className="absolute w-[80%] h-[100%] bg-[#e0efff] rounded-[40%] blur-sm rotate-12 opacity-70"></div>
              
              {/* The PC Image Container - Using w-full and h-auto to ensure percentages scale perfectly */}
              <div className="relative z-10 w-full max-w-[280px] mx-auto group cursor-pointer">
                <img 
                  src={product.deviceFrame} 
                  alt={`${product.title} on Desktop`} 
                  className="relative z-20 w-full h-auto drop-shadow-lg" 
                />
                
                {/* Screen Overlay (Using exact 1.83:1 aspect ratio) */}
                <div 
                  className="absolute z-10 rounded-[2px] opacity-90 group-hover:opacity-100 aspect-[1000/545] transition-all duration-[4000ms] ease-in-out bg-[position:top_center] group-hover:bg-[position:bottom_center]"
                  style={{
                    top: '11.5%', // Adjust top positioning
                    left: '15.5%',
                    width: '69%',
                    backgroundImage: `url("${product.screenshot}")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 text-left">
              {/* Description */}
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-4 text-[#4b5563] text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: product.languageColor }}
                    ></div>
                    <span>{product.language}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#4b5563]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{product.stars}</span>
                  </div>
                </div>
                
                <a 
                  href={product.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0969da] hover:bg-[#0353a4] rounded-lg transition-colors shadow-sm"
                >
                  Visit Website
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
