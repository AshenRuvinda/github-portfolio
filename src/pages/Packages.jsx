import React, { useState } from 'react';
import { softwarePackages } from '../data/packages';

export default function Packages({ onTabChange }) {
  const WHATSAPP_NUMBER = '94761511231';

  const handleInquire = (pkg) => {
    const text = `Hi Ashen, I am interested in your "${pkg.name}" (${pkg.price}) package. Could we discuss this project?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCustomQuote = () => {
    const text = `Hi Ashen, I'd like to get a custom quote for a software development project.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-slide-up space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#d0d7de] pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ddf4ff] text-[#0969da] text-xs font-semibold mb-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Transparent & Client-Oriented
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2328]">
              Software Development Packages
            </h1>
            <p className="text-sm sm:text-base text-[#57606a] mt-1.5 max-w-2xl">
              Transparent, deliverable-driven software development packages tailored for businesses, startups, and individuals. Choose the right package for your project or request a custom solution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCustomQuote}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-md bg-[#2da44e] hover:bg-[#2c974b] text-white transition-colors shadow-sm flex items-center gap-2"
            >
              Get Custom Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing and Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {softwarePackages.map((pkg) => {
          const isPopular = pkg.popular;
          return (
            <div
              key={pkg.id}
              className={`relative rounded-xl border flex flex-col justify-between transition-all duration-200 bg-white ${
                isPopular
                  ? 'border-[#0969da] shadow-lg ring-1 ring-[#0969da]/30'
                  : 'border-[#d0d7de] hover:border-[#b1bac4] hover:shadow-md'
              }`}
            >
              {/* Badge for Popular or Category */}
              {isPopular && (
                <div className="absolute -top-3 right-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0969da] text-white shadow-sm">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Header Section */}
                <div className="mb-4">
                  {!isPopular && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f6f8fa] border border-[#d0d7de] text-[#57606a] mb-2">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#1f2328]">{pkg.name}</h3>
                  <p className="text-xs text-[#57606a] mt-1">{pkg.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pb-4 mb-4 border-b border-[#d0d7de]">
                  <span className="text-3xl font-extrabold text-[#1f2328] tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-[#57606a]">{pkg.billing}</span>
                </div>

                {/* Delivery & Description */}
                <div className="mb-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#57606a]">
                    <svg className="w-4 h-4 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Estimated Delivery: <strong className="text-[#1f2328]">{pkg.deliveryTime}</strong></span>
                  </div>
                  <p className="text-sm text-[#57606a] leading-relaxed pt-1">
                    {pkg.description}
                  </p>
                </div>

                {/* Deliverables / Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-[#1f2328] uppercase tracking-wider mb-3">
                    What's included:
                  </h4>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#1f2328]">
                        <svg className="w-4 h-4 text-[#1a7f37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-[#57606a] uppercase tracking-wider mb-2">
                    Key Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-md bg-[#f6f8fa] border border-[#d0d7de] text-[#24292f] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-[#57606a] bg-[#f6f8fa] p-3 rounded-lg border border-[#e1e4e8]">
                  <strong className="text-[#1f2328]">Best for:</strong> {pkg.idealFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleInquire(pkg)}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-sm'
                      : 'bg-[#f6f8fa] text-[#1f2328] border border-[#d0d7de] hover:bg-[#ebeef2]'
                  }`}
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Select & Book Package</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow & Guarantee Section */}
      <div className="border border-[#d0d7de] rounded-xl p-6 bg-white space-y-6">
        <h3 className="text-lg font-bold text-[#1f2328]">How We Work Together</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#f6f8fa] border border-[#e1e4e8]">
            <span className="text-xl font-bold text-[#0969da] mb-1 block">01</span>
            <h4 className="font-semibold text-sm text-[#1f2328] mb-1">Discovery & Scope</h4>
            <p className="text-xs text-[#57606a]">We clarify requirements, wireframes, technical stack, and agreed milestones.</p>
          </div>
          <div className="p-4 rounded-lg bg-[#f6f8fa] border border-[#e1e4e8]">
            <span className="text-xl font-bold text-[#0969da] mb-1 block">02</span>
            <h4 className="font-semibold text-sm text-[#1f2328] mb-1">Rapid Development</h4>
            <p className="text-xs text-[#57606a]">Clean, modular codebase built with staging preview access for real-time progress.</p>
          </div>
          <div className="p-4 rounded-lg bg-[#f6f8fa] border border-[#e1e4e8]">
            <span className="text-xl font-bold text-[#0969da] mb-1 block">03</span>
            <h4 className="font-semibold text-sm text-[#1f2328] mb-1">Testing & Review</h4>
            <p className="text-xs text-[#57606a]">Cross-browser, responsive design, security validation, and client revisions.</p>
          </div>
          <div className="p-4 rounded-lg bg-[#f6f8fa] border border-[#e1e4e8]">
            <span className="text-xl font-bold text-[#0969da] mb-1 block">04</span>
            <h4 className="font-semibold text-sm text-[#1f2328] mb-1">Launch & Support</h4>
            <p className="text-xs text-[#57606a]">Deployment to your domain, handover documentation, and post-launch maintenance.</p>
          </div>
        </div>

        {/* FAQ Quick Accordion */}
        <div className="border-t border-[#d0d7de] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[#1f2328]">Need a tailored arrangement or custom milestone?</h4>
            <p className="text-xs text-[#57606a] mt-0.5">Let's discuss your scope, tech stack, and budget to build an exact fit.</p>
          </div>
          <button
            onClick={handleCustomQuote}
            className="px-4 py-2 text-xs font-semibold rounded-md border border-[#d0d7de] bg-[#f6f8fa] hover:bg-[#e1e4e8] text-[#1f2328] transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
