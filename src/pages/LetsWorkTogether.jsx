import React from 'react';

const ServiceIcon = ({ d }) => (
  <svg className="w-6 h-6 text-[#0969da]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 text-[#656d76]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 text-[#656d76]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export default function LetsWorkTogether() {
  const services = [
    {
      title: 'Full Stack Web Dev',
      description: 'Building end-to-end scalable web applications using modern web technologies.',
      iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      title: 'UI Design',
      description: 'Crafting intuitive, beautiful, and user-centric interfaces with pixel-perfect precision.',
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    {
      title: 'Video Editing',
      description: 'Creating engaging and high-quality video content tailored for your audience.',
      iconPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    },
    {
      title: 'Logo Design',
      description: 'Designing memorable, timeless, and impactful brand identities and logos.',
      iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1f2328] mb-3">Let's Work Together</h2>
        <p className="text-lg text-[#656d76] leading-relaxed max-w-3xl">
          I'm currently available for freelance work and open to new opportunities. 
          Whether you need a full-stack application, an intuitive user interface, or 
          robust backend solutions, I can help bring your ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Services & Info */}
        <div className="space-y-8">
          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-[#1f2328] mb-4">My Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl border border-[#d0d7de] bg-white hover:border-[#0969da] hover:shadow-sm transition-all group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#f6f8fa] flex items-center justify-center group-hover:bg-[#ebf5ff] transition-colors">
                    <ServiceIcon d={service.iconPath} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1f2328] text-base mb-1">{service.title}</h4>
                    <p className="text-sm text-[#656d76] leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details & Socials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
            <div>
              <h3 className="text-sm font-semibold text-[#1f2328] mb-3 uppercase tracking-wider">Contact Details</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:ashenave@gmail.com" className="flex items-center gap-3 text-sm text-[#0969da] hover:underline group">
                    <MailIcon />
                    <span className="group-hover:text-[#0353a4] break-all">ashenave@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/94761511231" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-[#0969da] hover:underline group">
                    <WhatsAppIcon />
                    <span className="group-hover:text-[#0353a4]">+94 76 151 1231</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-[#656d76]">
                  <LocationIcon />
                  <span>Eheliyagoda, Sri Lanka</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1f2328] mb-3 uppercase tracking-wider">Social Profiles</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.linkedin.com/in/ashen-ruvinda-929b83345/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-[#0969da] hover:underline group">
                    <LinkedInIcon />
                    <span className="group-hover:text-[#0353a4]">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div>
          <div className="p-4 sm:p-6 bg-white border border-[#d0d7de] rounded-xl shadow-sm lg:sticky lg:top-24">
            <h3 className="text-xl font-semibold text-[#1f2328] mb-2">Send a Message</h3>
            <p className="text-sm text-[#656d76] mb-6">Fill out the form below and I'll get back to you as soon as possible.</p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1f2328] mb-1.5">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-3.5 py-2.5 border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all bg-[#f6f8fa] focus:bg-white text-sm" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1f2328] mb-1.5">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-3.5 py-2.5 border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all bg-[#f6f8fa] focus:bg-white text-sm" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1f2328] mb-1.5">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full px-3.5 py-2.5 border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-all bg-[#f6f8fa] focus:bg-white resize-y text-sm" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full px-4 py-2.5 bg-[#2da44e] text-white font-semibold rounded-md hover:bg-[#2c974b] transition-colors shadow-sm flex justify-center items-center gap-2 mt-2"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
