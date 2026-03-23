import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import Overview from './pages/Overview';
import Repositories from './pages/Repositories';
import Experience from './pages/Experience';
import Education from './pages/Education';

function TabContent({ activeTab }) {
  switch (activeTab) {
    case 'overview':
      return <Overview />;
    case 'repositories':
      return <Repositories />;
    case 'experience':
      return <Experience />;
    case 'education':
      return <Education />;
    default:
      return <Overview />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top navbar */}
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab navigation - REMOVED: Now integrated in navbar */}

      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Profile sidebar */}
          <aside className={`w-full md:w-[296px] flex-shrink-0 ${activeTab === 'overview' ? 'block' : 'hidden md:block'}`}>
            <ProfileCard />
          </aside>

          {/* Right: Tab content */}
          <div className={`flex-1 min-w-0 ${activeTab === 'overview' ? 'md:ml-0' : ''}`}>
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#d0d7de] py-6">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#656d76]">
            <div className="flex items-center gap-1">
              <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span>© 2026 Ashen Ruvinda</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4">
              {['Terms', 'Privacy', 'Security', 'Status', 'Docs', 'Contact', 'Manage cookies'].map((link) => (
                <a key={link} href="#" className="hover:text-[#0969da] hover:underline transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
