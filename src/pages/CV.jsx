import React from 'react';
import { experiences } from '../data/experience';
import { educationData } from '../data/education';

export default function CV({ onTabChange }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg p-3 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#ddf4ff] text-[#0969da] rounded-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          <div>
            <h2 className="text-sm font-semibold text-[#1f2328]">Curriculum Vitae</h2>
            <p className="text-xs text-[#656d76]">Last updated: 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f3f4f6] text-[#1f2328] transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5 text-[#656d76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / Save PDF</span>
          </button>

          {onTabChange && (
            <button
              onClick={() => onTabChange('work')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#1f2328] hover:bg-[#31373d] text-white transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Get in Touch</span>
            </button>
          )}
        </div>
      </div>

      {/* CV Sheet Container */}
      <div className="bg-white border border-[#d0d7de] rounded-xl shadow-sm p-6 sm:p-10 space-y-8 text-[#1f2328]">
        {/* Header */}
        <div className="border-b border-[#d0d7de] pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1f2328] tracking-tight">Ashen Ruvinda</h1>
              <p className="text-base font-medium text-[#0969da] mt-1">
                Software Engineering Undergraduate · Full Stack Developer
              </p>
              <p className="text-xs text-[#656d76] mt-1">
                Eheliyagoda, Sri Lanka · Available for Remote & On-site Opportunities
              </p>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-[#656d76]">
            <a
              href="mailto:ashenave@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#0969da] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>ashenave@gmail.com</span>
            </a>

            <a
              href="https://github.com/AshenRuvinda"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#0969da] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span>github.com/AshenRuvinda</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ashen-ruvinda/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#0969da] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>linkedin.com/in/ashen-ruvinda</span>
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <section>
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#656d76] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0969da]" />
            Professional Summary
          </h2>
          <p className="text-sm text-[#1f2328] leading-relaxed">
            Software Engineering undergraduate at NSBM Green University with hands-on experience in full-stack web and mobile application development. Proficient in the MERN stack (MongoDB, Express, React, Node.js), Python, and modern frontend tools. Experienced in building scalable APIs, role-based dashboards, and intuitive user experiences with a commitment to clean code, performance, and responsive design.
          </p>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#656d76] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1a7f37]" />
            Work Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-[#d0d7de] pl-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1f2328]">{exp.role}</h3>
                    <p className="text-xs font-medium text-[#0969da]">
                      <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        {exp.company}
                      </a>
                      <span className="text-[#656d76] font-normal"> · {exp.location}</span>
                    </p>
                  </div>
                  <span className="text-xs text-[#656d76] font-mono bg-[#f6f8fa] px-2 py-0.5 rounded border border-[#d0d7de] self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs text-[#656d76] leading-relaxed">
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#1f2328]">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>
                )}

                {exp.tech && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] rounded bg-[#f6f8fa] border border-[#d0d7de] text-[#1f2328]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#656d76] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8250df]" />
            Education
          </h2>
          <div className="space-y-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="border-l-2 border-[#d0d7de] pl-4 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1f2328]">{edu.degree}</h3>
                    <p className="text-xs text-[#0969da] font-medium">
                      {edu.school}
                      <span className="text-[#656d76] font-normal"> · {edu.location}</span>
                    </p>
                  </div>
                  <span className="text-xs text-[#656d76] font-mono bg-[#f6f8fa] px-2 py-0.5 rounded border border-[#d0d7de] self-start sm:self-auto">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[#656d76] leading-relaxed">{edu.description}</p>
                {edu.courses && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 text-[11px] rounded bg-[#ddf4ff] text-[#0969da] border border-[#b6e3ff]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#656d76] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bf8700]" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
              <span className="font-semibold text-[#1f2328] block mb-1">Frontend Development</span>
              <p className="text-[#656d76] leading-relaxed">
                React.js, React Native, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
              <span className="font-semibold text-[#1f2328] block mb-1">Backend & APIs</span>
              <p className="text-[#656d76] leading-relaxed">
                Node.js, Express.js, RESTful APIs, Python, JWT Authentication, Role-based Access Control
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
              <span className="font-semibold text-[#1f2328] block mb-1">Databases</span>
              <p className="text-[#656d76] leading-relaxed">
                MongoDB, SQL Server, MySQL, Database Indexing, Aggregation Framework
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa]">
              <span className="font-semibold text-[#1f2328] block mb-1">DevOps, Cloud & Tools</span>
              <p className="text-[#656d76] leading-relaxed">
                Git, GitHub, Docker, Postman, Linux/Bash, Figma, Vite, Electron.js
              </p>
            </div>
          </div>
        </section>

        {/* Notable Projects */}
        <section>
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#656d76] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#cf222e]" />
            Key Projects
          </h2>
          <div className="space-y-3">
            <div className="border border-[#d0d7de] rounded-lg p-3">
              <div className="flex items-center justify-between">
                <a
                  href="https://github.com/AshenRuvinda/MERN-POS"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#0969da] hover:underline"
                >
                  MERN Stack POS & Inventory System
                </a>
                <span className="text-[11px] text-[#656d76]">React · Node.js · Express · MongoDB</span>
              </div>
              <p className="text-xs text-[#656d76] mt-1 leading-relaxed">
                Complete point-of-sale and inventory solution with real-time stock sync, role-based login, cashier checkout, and Tailwind CSS responsive interface.
              </p>
            </div>

            <div className="border border-[#d0d7de] rounded-lg p-3">
              <div className="flex items-center justify-between">
                <a
                  href="https://github.com/AshenRuvinda/QR-Login"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#0969da] hover:underline"
                >
                  Full Stack QR Attendance Marking System
                </a>
                <span className="text-[11px] text-[#656d76]">MERN · QR Code · Real-time</span>
              </div>
              <p className="text-xs text-[#656d76] mt-1 leading-relaxed">
                Attendance platform featuring dynamic QR generation, camera scanning, employee shift tracking, automated check-in/out, and reporting dashboards.
              </p>
            </div>

            <div className="border border-[#d0d7de] rounded-lg p-3">
              <div className="flex items-center justify-between">
                <a
                  href="https://olinton.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#0969da] hover:underline"
                >
                  Olinton Tea (Production Commercial Website)
                </a>
                <span className="text-[11px] text-[#656d76]">Live Production · Web</span>
              </div>
              <p className="text-xs text-[#656d76] mt-1 leading-relaxed">
                Commercial brand website developed for Ceylon tea brand Olinton Tea with responsive design, brand storytelling, and product catalogs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
