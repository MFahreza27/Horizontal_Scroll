import React, { useEffect, useState, useRef } from 'react';

const ScrollHorizontalpages = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [animationTime, setAnimationTime] = useState(0);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const sections = [
    { 
      title: "Mochamad Fahreza", 
      subtitle: "Fullstack Developer | UI/UX Designer", 
      nav: "Home"
    },
    { 
      title: "Tentang Saya", 
      content: "Lulusan Universitas Muhammadiyah Cirebon, jurusan Teknik Informatika. Menguasai dasar-dasar pemrograman, pengembangan web, dan pengelolaan basis data, serta memiliki kemampuan dalam menggunakan berbagai software pengembangan dan memiliki ketelitian, manajemen waktu, serta kemampuan riset yang baik. Saya terampil dalam mengoperasikan Microsoft Office (Word, Excel, dan Power Point). Dan mencari peluang kerja yang memberikan peluang dan pengalaman baru untuk berkembang.",
      nav: "Profile"
    },
    { 
      title: "Project", 
      nav: "Project"
    },
    { 
      title: "Skiils", 
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      nav: "Skill"
    },
    { 
      title: "Contact", 
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      nav: "Contact"
    },
  ];

  const sectionImages = [
    <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center text-6xl mb-6">💻</div>,
    

  ];

  useEffect(() => {
    const animate = () => {
      setAnimationTime(prev => prev + 0.016);
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = scrollTop / documentHeight;
      setScrollProgress(progress);

      const currentIndex = Math.round(progress * (sections.length - 1));
      setCurrentSectionIndex(currentIndex);

      if (scrollContainerRef.current) {
        const maxTranslateX = scrollContainerRef.current.scrollWidth - window.innerWidth;
        const translateX = progress * maxTranslateX;
        scrollContainerRef.current.style.transform = `translateX(-${translateX}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  useEffect(() => {
    if (containerRef.current && scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = scrollWidth - windowWidth;
      const newHeight = window.innerHeight + scrollDistance;
      containerRef.current.style.height = `${newHeight}px`;
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToSection = (index) => {
    if (scrollContainerRef.current && containerRef.current) {
      const sectionWidth = scrollContainerRef.current.scrollWidth / sections.length;
      const targetX = sectionWidth * index;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;

      const scrollRatio = targetX / (scrollContainerRef.current.scrollWidth - window.innerWidth);
      const targetScrollY = scrollRatio * maxScroll;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  const generateMovingLines = (sectionIndex) => {
    const lines = [];
    const lineCount = 8 + (sectionIndex * 2);
    
    for (let i = 0; i < lineCount; i++) {
      const speed = 0.3 + (i * 0.1);
      const amplitude = 15 + (i * 5);
      const frequency = 0.8 + (i * 0.2);
      const phase = i * 0.5;
      const opacity = 0.03 + (i * 0.005);
      
      const pathData = Array.from({ length: 101 }, (_, x) => {
        const normalizedX = x / 100;
        const y1 = 50 + Math.sin((normalizedX * frequency + animationTime * speed + phase) * Math.PI * 2) * amplitude;
        const y2 = 50 + Math.cos((normalizedX * frequency * 1.3 + animationTime * speed * 0.7 + phase) * Math.PI * 2) * amplitude * 0.6;
        const finalY = (y1 + y2) / 2;
        return `${x === 0 ? 'M' : 'L'} ${x} ${finalY}`;
      }).join(' ');

      lines.push(
        <path
          key={i}
          d={pathData}
          stroke={isDarkMode ? "white" : "black"}
          strokeWidth="0.5"
          strokeOpacity={opacity}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      );
    }
    
    return lines;
  };

  const generateStaticPattern = (sectionIndex) => {
    const patterns = [];
    const patternCount = 5;
    
    for (let i = 0; i < patternCount; i++) {
      const phase = (sectionIndex * 0.3) + (i * 0.4);
      const amplitude = 8 + (i * 3);
      const frequency = 1.2 + (i * 0.3);
      
      const pathData = `M0 ${50 + Math.sin(phase) * amplitude} Q25 ${30 + Math.cos(phase + 1) * amplitude}, 50 ${50 + Math.sin(phase + 2) * amplitude} T100 ${50 + Math.cos(phase + 3) * amplitude}`;
      
      patterns.push(
        <path
          key={i}
          d={pathData}
          stroke={isDarkMode ? "white" : "black"}
          strokeWidth="0.3"
          strokeOpacity={0.08}
          fill="none"
        />
      );
    }
    
    return patterns;
  };

  const themeClass = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  const secondaryText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <div ref={containerRef} className={`relative transition-colors duration-500 ${themeClass}`}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 left-20 z-40 px-3 py-1 rounded-md border border-gray-500 text-sm bg-transparent hover:bg-gray-500/10"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex h-full"
          style={{
            width: `${sections.length * 100}vw`,
            willChange: 'transform',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className={`w-screen h-full flex items-center justify-center relative ${themeClass} ${borderColor} border-r overflow-hidden`}
            >
              {index >= 1 && (
                <svg 
                  className="absolute inset-0 w-full h-full z-0" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                  style={{ pointerEvents: 'none' }}
                >
                  {generateMovingLines(index)}
                </svg>
              )}

              <svg className="absolute bottom-0 left-0 w-full h-40 z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                {generateStaticPattern(index)}
              </svg>

              {index >= 1 && (
                <div className="absolute inset-0 z-0">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px),
                        linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px',
                      transform: `translate(${Math.sin(animationTime * 0.1 + index) * 10}px, ${Math.cos(animationTime * 0.15 + index) * 5}px)`
                    }}
                  />
                </div>
              )}

              {index >= 1 && (
                <div className="absolute inset-0 z-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white' : 'bg-black'} rounded-full opacity-20`}
                      style={{
                        left: `${20 + (i * 12)}%`,
                        top: `${30 + Math.sin(animationTime * 0.5 + i + index) * 20}%`,
                        transform: `translateY(${Math.cos(animationTime * 0.3 + i + index) * 30}px)`
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="z-10 px-8 text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  {sectionImages[index]}
                </div>

                <h1
                  className="text-4xl md:text-6xl font-bold tracking-wider mb-4"
                  style={{
                    textShadow: '0 0 15px rgba(255,255,255,0.1)',
                    transform: `scale(${1 + Math.sin(scrollProgress * Math.PI * 4 + index) * 0.05})`
                  }}
                >
                  {section.title}
                </h1>
                <h2 className={`text-lg md:text-2xl font-light mb-6 ${secondaryText}`}>{section.subtitle}</h2>
                <p className={`text-sm md:text-base ${secondaryText} mb-8 font-light tracking-wide`}>
                  {section.description}
                </p>

                <div className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${secondaryText} font-light`}>
                  <p className="tracking-wide line-height-loose">
                    {section.content}
                  </p>
                </div>

                {index === 0 && (
                  <div className="mt-12 flex justify-center space-x-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white rounded-full opacity-40"
                        style={{ animation: `ping ${1 + i * 0.3}s ease-in-out infinite` }}
                      />
                    ))}
                  </div>
                )}

                {index === 2 && (
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                    {['Branding', 'Web Design', 'Print', 'Digital Art'].map((skill, i) => (
                      <div key={i} className={`p-3 rounded-lg border ${borderColor} bg-opacity-50 backdrop-blur-sm text-xs font-mono`}>
                        {skill}
                      </div>
                    ))}
                  </div>
                )}

                {index === 4 && (
                  <div className="mt-8 space-y-2 text-sm font-mono opacity-70">
                    <p>Fahrezamocamad@gmail.com</p>
                    <p>+6289601250752</p>
                    <p>Cirebon, Indonesia</p>
                  </div>
                )}
              </div>

              <div className="absolute bottom-8 left-8 opacity-30 text-sm font-mono z-10">
                {String(index + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed top-4 right-4 z-20">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen z-30 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isSidebarOpen
            ? `${themeClass} px-6 py-10 ${borderColor} border-r w-60 translate-x-0`
            : `w-10 ${themeClass} hover:w-16 group overflow-hidden`
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={`text-3xl font-thin transition-all duration-300 ${
            isSidebarOpen ? 'self-end mb-10' : 'transform rotate-90 mb-4'
          }`}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? '×' : '⋮'}
        </button>

        {isSidebarOpen && (
          <>
            <div className="space-y-4">
              <h2 className={`font-bold text-sm tracking-wider ${secondaryText}`}>PORTFOLIO</h2>
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className="flex items-center space-x-2 group cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentSectionIndex ? 'bg-white' : 'bg-gray-300'
                    }`}
                  />
                  <span
                    className={`text-sm tracking-widest transition-all duration-300 ${
                      idx === currentSectionIndex ? 'font-bold' : 'text-gray-600'
                    }`}
                  >
                    {section.nav}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollHorizontalpages;