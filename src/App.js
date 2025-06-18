import React, { useEffect, useState, useRef } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';


const ScrollHorizontalpages = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [animationTime, setAnimationTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      description: "Modern e-commerce platform built with React and Node.js. Features include shopping cart, payment integration, user authentication, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      year: "2024"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      description: "Complete mobile banking application design with intuitive user interface and seamless user experience. Includes wireframes, prototypes, and final designs.",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      year: "2023"
    },
    {
      id: 3,
      title: "Restaurant Management System",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      description: "Comprehensive restaurant management system with POS, inventory management, staff scheduling, and customer relationship management features.",
      technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
      year: "2024"
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      description: "Creative portfolio website with horizontal scrolling animation and interactive elements. Built with modern web technologies and responsive design.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
      year: "2024"
    },
    {
      id: 5,
      title: "Learning Management System",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
      description: "Online learning platform with course management, video streaming, progress tracking, and certification system for educational institutions.",
      technologies: ["Next.js", "PostgreSQL", "AWS", "WebRTC"],
      year: "2023"
    },
    {
      id: 6,
      title: "Brand Identity Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      description: "Complete brand identity package including logo design, color palette, typography, business cards, and brand guidelines for a tech startup.",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "InDesign", "Brand Strategy"],
      year: "2024"
    }
  ];

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
      title: "Resume", 
      nav: "Resume"
    },
    { 
      title: "Contact", 
      nav: "Contact"
    },
  ];

  const sectionImages = [
    <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center text-6xl mb-6">💻</div>,
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const animate = () => {
      setAnimationTime(prev => prev + 0.016);
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Mobile: native horizontal scroll
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const handleHorizontalScroll = () => {
          const scrollLeft = scrollContainer.scrollLeft;
          const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const progress = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;
          setScrollProgress(progress);
          
          const currentIndex = Math.round(progress * (sections.length - 1));
          setCurrentSectionIndex(currentIndex);
        };

        scrollContainer.addEventListener('scroll', handleHorizontalScroll);
        return () => scrollContainer.removeEventListener('scroll', handleHorizontalScroll);
      }
    } else {
      // Desktop: vertical scroll controls horizontal movement
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
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
    }
  }, [sections.length, isMobile]);

  useEffect(() => {
    if (containerRef.current && scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      if (isMobile) {
        // Mobile: container height normal, enable horizontal scroll
        containerRef.current.style.height = '100vh';
        scrollContainerRef.current.style.transform = 'none';
      } else {
        // Desktop: extended height for vertical scroll
        const scrollDistance = scrollWidth - windowWidth;
        const newHeight = window.innerHeight + scrollDistance;
        containerRef.current.style.height = `${newHeight}px`;
      }
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToSection = (index) => {
    if (isMobile && scrollContainerRef.current) {
      // Mobile: scroll horizontal
      const sectionWidth = scrollContainerRef.current.scrollWidth / sections.length;
      const targetX = sectionWidth * index;
      
      scrollContainerRef.current.scrollTo({
        left: targetX,
        behavior: 'smooth',
      });
    } else if (scrollContainerRef.current && containerRef.current) {
      // Desktop: scroll vertical
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

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
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

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${themeClass} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative`}>
            <button
              onClick={closeProject}
              className="absolute top-6 right-6 text-2xl hover:scale-110 transition-transform z-10"
            >
              ×
            </button>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-xs rounded-full ${borderColor} border ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm ${secondaryText}`}>{selectedProject.category}</span>
                    <span className={`text-sm ${secondaryText}`}>{selectedProject.year}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{selectedProject.title}</h2>
                  
                  <p className={`${secondaryText} leading-relaxed text-sm md:text-base`}>
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-8 flex gap-4">
                    <button className={`px-6 py-2 rounded-lg ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} hover:scale-105 transition-transform text-sm`}>
                      View Live
                    </button>
                    <button className={`px-6 py-2 rounded-lg border ${borderColor} hover:scale-105 transition-transform text-sm`}>
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={`flex h-full ${isMobile ? 'overflow-x-auto overflow-y-hidden' : ''}`}
          style={{
            width: `${sections.length * 100}vw`,
            willChange: 'transform',
            transition: isMobile ? 'none' : 'transform 0.3s ease-out',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
          }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className={`w-screen h-full flex items-center justify-center relative ${themeClass} ${borderColor} border-r overflow-hidden ${isMobile ? 'scroll-snap-align-start' : ''}`}
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

              <div className="z-10 px-8 text-center max-w-6xl mx-auto">
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

                {/* Project Gallery - Updated grid untuk mobile 2 kolom maksimal */}
                {index === 2 && (
                  <div className="mt-12">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => openProject(project)}
                          className="group cursor-pointer"
                        >
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="text-white font-bold text-xs md:text-sm mb-1">{project.title}</h3>
                              <p className="text-white/80 text-xs">{project.category}</p>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-3 text-left">
                            <h3 className={`font-medium text-xs md:text-sm ${secondaryText}`}>{project.title}</h3>
                            <p className={`text-xs ${secondaryText} opacity-60`}>{project.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Timeline Section */}
                  {index === 3 && (
                    <div className="mt-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                      
                      {/* PENDIDIKAN */}
                      <div>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Pendidikan</h2>
                        <div className="space-y-6">

                          {/* ITEM 1 */}
                          <div className="grid grid-cols-[7rem_1px_1fr] gap-4 items-start">
                            <div className="text-sm text-slate-400">2020 - 2025</div>
                            <div className="bg-blue-400 w-px h-full"></div>
                            <div>
                              <h3 className="text-white font-semibold">Universitas Muhammadiyah Cirebon</h3>
                              <p className="text-sm text-blue-400 mt-1">S1 Teknik Informatika</p>
                            </div>
                          </div>

                          {/* ITEM 2 */}
                          <div className="grid grid-cols-[7rem_1px_1fr] gap-4 items-start">
                            <div className="text-sm text-slate-400">2017 - 2020</div>
                            <div className="bg-blue-400 w-px h-full"></div>
                            <div>
                              <h3 className="text-white font-semibold">SMA Negeri 1 Plumbon</h3>
                              <p className="text-sm text-blue-400 mt-1">MIPA</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PENGALAMAN */}
                      <div>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Pengalaman</h2>
                        <div className="space-y-6">

                          {/* ITEM 1 */}
                          <div className="grid grid-cols-[7rem_1px_1fr] gap-4 items-start">
                            <div className="text-sm text-slate-400">2023</div>
                            <div className="bg-blue-400 w-px h-full"></div>
                            <div>
                              <h3 className="text-white font-semibold">Dinas Kearsipan & Perpustakaan</h3>
                              <p className="text-sm text-blue-400 mt-1">Magang</p>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  )}
                  <div className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed ${secondaryText} font-light`}>
                  <p className="tracking-wide line-height-loose">
                    {section.content}
                  </p>
                </div>

{index === 4 && (
  <div className="mt-10 max-w-sm mx-auto space-y-4">
    {/* Email */}
    <div className="flex items-center space-x-3 border border-slate-700 rounded-lg px-4 py-3 hover:border-blue-400 transition">
      <Mail className="text-blue-400 w-5 h-5" />
      <span className="text-blue-400 font-medium">fahrezamochamad@gmail.com</span>
    </div>

    {/* LinkedIn */}
    <div className="flex items-center space-x-3 border border-slate-700 rounded-lg px-4 py-3 hover:border-blue-400 transition">
      <Linkedin className="text-blue-400 w-5 h-5" />
      <span className="text-blue-400 font-medium">Nochamad Fahreza</span>
    </div>

    {/* GitHub */}
    <div className="flex items-center space-x-3 border border-slate-700 rounded-lg px-4 py-3 hover:border-blue-400 transition">
      <Github className="text-blue-400 w-5 h-5" />
      <span className="text-blue-400 font-medium">MFahreza27</span>
    </div>
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