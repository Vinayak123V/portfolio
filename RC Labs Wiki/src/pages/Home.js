import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=85',
    tag: 'Innovation',
    title: 'Intelligent Battery Management',
    subtitle: 'Powering the future of electric mobility with adaptive BMS technology',
    color: '#0066cc',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
    tag: 'Technology',
    title: 'Chemistry Agnostic Solutions',
    subtitle: 'Compatible with NMC, LFP, LTO, Supercapacitors and more',
    color: '#6f42c1',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85',
    tag: 'Connectivity',
    title: 'IoT-Enabled Intelligence',
    subtitle: 'Real-time monitoring, remote diagnostics and over-the-air updates',
    color: '#28a745',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=85',
    tag: 'Scalability',
    title: 'Scalable & Modular Design',
    subtitle: 'From electric bikes to electric buses — one platform, infinite scale',
    color: '#fd7e14',
  },
];

const stats = [
  { value: '100+', label: 'Cells in Series' },
  { value: '5+', label: 'Battery Chemistries' },
  { value: '2000+', label: 'Vehicles Monitored' },
  { value: '99.9%', label: 'System Uptime' },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION = 5000;

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const step = 50;
    const increment = (step / DURATION) * 100;
    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + increment;
      });
    }, step);
    const slideTimer = setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, DURATION);
    return () => { clearInterval(progressTimer); clearTimeout(slideTimer); };
  }, [currentSlide, paused]);

  const goToSlide = (index) => { setCurrentSlide(index); setProgress(0); };
  const goToNext  = () => goToSlide((currentSlide + 1) % slides.length);
  const goToPrev  = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="home-page">

      {/* Hero Slider */}
      <div
        className="hero-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : index === (currentSlide - 1 + slides.length) % slides.length ? 'prev' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay" />
            <div className="slide-content">
              <span className="slide-tag" style={{ background: slide.color }}>{slide.tag}</span>
              <div className="slide-logo">
                <img src="/RCLabs_Logo.png" alt="RC Labs" className="slide-logo-img" />
              </div>
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <Link to="/project-documentation/active-projects" className="slide-cta" style={{ background: slide.color }}>
                Explore Projects <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="slider-arrow left" onClick={goToPrev} aria-label="Previous">&#8249;</button>
        <button className="slider-arrow right" onClick={goToNext} aria-label="Next">&#8250;</button>

        {/* Slide counter */}
        <div className="slide-counter">
          <span className="counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="counter-sep"> / </span>
          <span className="counter-total">{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Thumbnail dots with progress */}
        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentSlide && (
                <span className="dot-progress" style={{ width: `${progress}%` }} />
              )}
            </button>
          ))}
        </div>

        {/* Pause indicator */}
        {paused && <div className="pause-badge">⏸ Paused</div>}
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-inner">
          <img src="/RCLabs_Logo.png" alt="RC Labs" className="welcome-logo-img" />
          <div className="welcome-text">
            <h2>Welcome to RC Labs Internal Wiki</h2>
            <p>
              Your central knowledge hub for company policies, onboarding resources,
              and project documentation. Empowering every team member with the right information.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Navigation Cards */}
      <div className="home-section">
        <h2 className="section-heading">Quick Access</h2>
        <div className="home-cards">
          <Link to="/hr-policies" className="home-nav-card hr">
            <div className="nav-card-icon"></div>
            <h3>HR Policies</h3>
            <p>Work hours, leave, salary, conduct & exit procedures</p>
            <span className="nav-card-arrow">→</span>
          </Link>

          <Link to="/employee-onboarding" className="home-nav-card onboarding">
            <div className="nav-card-icon"></div>
            <h3>Employee Onboarding</h3>
            <p>Pre-joining, day 1 steps, tools, first week & contacts</p>
            <span className="nav-card-arrow">→</span>
          </Link>

          <Link to="/project-documentation" className="home-nav-card projects">
            <div className="nav-card-icon"></div>
            <h3>Project Documentation</h3>
            <p>Active, withheld & completed BMS projects</p>
            <span className="nav-card-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="home-about">
        <div className="about-text">
          <h2>About RC Labs</h2>
          <p>
            Incorporated in 2019, RC Labs designs and manufactures <strong>Intelligent Battery
            Management Systems</strong> for EVs and stationary energy storage, capitalizing on
            7 years of research at The Hong Kong Polytechnic University.
          </p>
          <p>
            Our BMS solutions are adaptive, chemistry-agnostic, and modular — supporting
            everything from electric bikes to electric buses using advanced data acquisition
            and machine learning algorithms.
          </p>
          <div className="about-tags">
            <span>Adaptive Control</span>
            <span> Chemistry Agnostic</span>
            <span>Modular Design</span>
            <span>IoT Enabled</span>
          </div>
        </div>
        <div className="about-logo-panel">
          <img src="/RCLabs_Logo.png" alt="RC Labs" className="about-logo-img" />
          <p className="about-tagline">Intelligent Battery Management</p>
        </div>
      </div>

      
          
      

    </div>
  );
};

export default Home;
