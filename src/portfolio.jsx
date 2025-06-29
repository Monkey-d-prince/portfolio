import { Award, Brain, Code, Database, Gamepad2, Github, Heart, Linkedin, Mail, MapPin, Menu, Phone, Star, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import LogoPG from './LogoPG';
import './portfolio-custom.css';

// Typewriter effect hook
function useTypewriter(texts, speed = 80, pause = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) setIndex(0);
    if (!deleting && subIndex === texts[index].length) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(texts[index].substring(0, subIndex + (deleting ? -1 : 1)));
      setSubIndex((v) => v + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, texts, speed, pause]);

  return displayed;
}

const Portfolio = () => {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animate on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Hero animation
    setTimeout(() => {
      document.querySelector('.hero-content')?.classList.add('animate-in');
    }, 500);

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.5}s`;
    });

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skills = {
    frontend: ['React.js', 'Redux', 'JavaScript', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'MongoDB', 'ClickHouse', 'RESTful APIs'],
    ml: ['TensorFlow', 'scikit-learn', 'Python', 'NLP', 'Predictive Analytics', 'Agentic AI', 'Web Scraping', 'LLM Integration'],
    tools: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Unreal Engine 5', 'Blender', 'SMTP Config', 'Automation Tools']
  };

  const projects = [
    {
      title: "NLP Model for We360.ai",
      description: "Currently developing advanced NLP models for workplace analytics at We360.ai, focusing on sentiment analysis and behavioral predictions.",
      tech: [],
      stack: ["Python", "TensorFlow", "scikit-learn", "FastAPI", "Clickhouse", "React.js", "Vanna"],
      type: "Professional",
      private: true
    },
    {
      title: "LinkedIn Scraper",
      description: "Advanced scraping tool that extracts company data and decision-maker contact information from LinkedIn, with integrated AI-powered email generation and SMTP server configuration for automated outreach.",
      tech: [],
      stack: ["Python", "Selenium", "BeautifulSoup", "SMTP", "LLM", "React.js"],
      type: "Automation & AI",
      private: true
    },
    {
      title: "Doodle Classifier",
      description: "ML model achieving 70-80% accuracy in classifying hand-drawn doodles, deployed as a real-time web application with CSV processing capabilities.",
      tech: [],
      stack: ["Python", "TensorFlow", "Flask", "OpenCV", "ClickHouse"],
      type: "Machine Learning",
      private: true
    },
    {
      title: "Blog Application and Generator    ",
      description: "Feature-rich blogging platform with CRUD operations, state persistence, and responsive design using modern React patterns.",
      tech: [],
      stack: ["React.js", "Redux", "localStorage", "Custom CSS","LLM/AI"],
      type: "Web Development",
      private: true
    },
    {
      title: "Agentic AI System",
      description: "Intelligent agent system capable of autonomous decision-making and task execution using advanced AI algorithms.",
      tech: [],
      stack: ["Python", "FastAPI", "AI Agents", "ClickHouse"],
      type: "Artificial Intelligence",
      private: true
    },
    {
      title: "ML Terrain Classification for SIH'23",
      description: "Developed a machine learning solution for SIH'23 to classify terrain types and determine attributes such as slipperiness, rockiness, and more, aiding in real-time terrain assessment.",
      tech: [],
      stack: ["Python", "Vanna", "RAG", "Machine Learning"],
      type: "Competition/Research",
      private: true
    }
  ];

  // Section scroll tracking for navbar highlight
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "services",
      "contact"
    ];
    const handleScroll = () => {
      let found = 'home';
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            found = sectionIds[i];
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Typewriter effect for subtitle
  const typewriterTexts = [
    'Full Stack Developer',
    'ML Engineer',
    'AI Enthusiast',
    'Automation Expert',
    'React & Python Specialist'
  ];
  const typewriter = useTypewriter(typewriterTexts, 70, 1200);

  return (
    <div className="portfolio-root dark-theme">
      {/* Animated Gradient Background */}
      <div className="hero-animated-bg" />
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: isHovering ? 'scale(2)' : 'scale(1)'
        }}
      />

      {/* Floating Elements */}
      <div className="floating-elements-container">
        <div className="floating-element floating-code">
          <Code className="floating-icon floating-code-icon" size={24} />
        </div>
        <div className="floating-element floating-brain">
          <Brain className="floating-icon floating-brain-icon" size={20} />
        </div>
        <div className="floating-element floating-database">
          <Database className="floating-icon floating-database-icon" size={18} />
        </div>
        <div className="floating-element floating-zap">
          <Zap className="floating-icon floating-zap-icon" size={22} />
        </div>
        <div className="floating-element floating-star">
          <Star className="floating-icon floating-star-icon" size={16} />
        </div>
        <div className="floating-element floating-heart">
          <Heart className="floating-icon floating-heart-icon" size={20} />
        </div>
      </div>

      {/* Interactive Background Elements */}
      <div 
        className="interactive-bg-1"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      <div 
        className="interactive-bg-2"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-row">
            <div className="navbar-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogoPG size={34} />
            </div>
            {/* Desktop Menu */}
            <div className="navbar-menu-desktop">
              {[
                { id: "home", label: "home" },
                { id: "about", label: "about" },
                { id: "skills", label: "skills" },
                { id: "projects", label: "projects" },
                { id: "services", label: "services" },
                { id: "contact", label: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`navbar-link${activeSection === item.id ? ' navbar-link-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button
              className="navbar-menu-mobile-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="navbar-menu-mobile">
              {[
                { id: "home", label: "home" },
                { id: "about", label: "about" },
                { id: "skills", label: "skills" },
                { id: "projects", label: "projects" },
                { id: "services", label: "services & plans" },
                { id: "contact", label: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="navbar-link-mobile"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section simple-hero">
        <div className="hero-bg"></div>
        <div className="hero-content simple-hero-content animate-in">
          <h1 className="hero-title-gradient">Prince Gupta</h1>
          <h2 className="hero-role">Full Stack Developer & ML Engineer</h2>
          <p className="hero-desc-centered">
            I'm a Full Stack Developer and ML Engineer skilled in the MERN stack, Python, and modern AI/ML frameworks. I build scalable web apps and intelligent solutions, combining clean code with a focus on UX. I thrive on challenges and love creating impactful tech with innovative teams!
          </p>
          <div className="hero-btn-row hero-btn-row-centered">
            <button 
              onClick={() => scrollToSection('projects')}
              className="hero-btn hero-btn-primary enhanced-cta hero-btn-large"
            >
              <Code size={20} />
              View Projects
            </button>
            <a href="mailto:prince0862gupta@gmail.com" className="hero-btn hero-btn-secondary enhanced-cta hero-btn-large">
              <Mail size={20} />
              Contact Me
            </a>
          </div>
          {/* Interactive Code Snippet Card */}
          <div className="hero-code-card interactive-code-card">
            <div className="code-card-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <pre className="code-card-body">
{`const developer = {
  name: "Prince Gupta",
  role: "Full Stack & ML Engineer",
  skills: ["React", "Node.js", "Python", "AI/ML"]
};

if (project.isChallenging) {
  developer.solve(project);
}`}
            </pre>
          </div>
          {/* Subtle floating element */}
          <div className="hero-float-blob" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section animate-on-scroll">
        <div className="about-container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-para">
                I'm a passionate B.Tech CSE-IoT student at Lakshmi Narain College of Technology, Bhopal, 
                specializing in full-stack development, machine learning, and automation. Currently interning at We360.ai, 
                where I'm developing cutting-edge NLP models for workplace analytics.
              </p>
              <p className="about-para">
                My expertise spans from building robust web applications with the MERN stack to creating 
                intelligent AI systems, web scraping tools, and automated email generation platforms. 
                I believe in leveraging technology to solve real-world problems and streamline business processes.
              </p>
              <div className="about-stats-grid">
                <div className="about-stat">
                  <div className="about-stat-value">2-3+</div>
                  <div className="about-stat-label">Years of Coding</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-value">10+</div>
                  <div className="about-stat-label">Projects Built</div>
                </div>
              </div>
            </div>
            <div className="about-info">
              <div className="about-info-row">
                <MapPin className="about-info-icon" size={20} />
                <span>Bhopal, Madhya Pradesh</span>
              </div>
              <div className="about-info-row">
                <Phone className="about-info-icon" size={20} />
                <span>+91 6394590862</span>
              </div>
              <div className="about-info-row">
                <Mail className="about-info-icon" size={20} />
                <span>prince0862gupta@gmail.com</span>
              </div>
              <div className="about-info-row">
                <Award className="about-info-icon" size={20} />
                <span>SIH'23 Finalist</span>
              </div>
              <div className="about-social-row">
                <a href="https://github.com/Monkey-d-prince" className="about-social-link" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/prince-gupta-40681825a/" className="about-social-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section animate-on-scroll">
        <div className="skills-container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div 
              className="skills-card skills-card-frontend interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Code className="skills-icon skills-icon-frontend" size={32} />
              <h3 className="skills-title skills-title-frontend">Frontend</h3>
              <div className="skills-list">
                {skills.frontend.map((skill, index) => (
                  <div key={index} className="skills-list-item">{skill}</div>
                ))}
              </div>
            </div>
            <div 
              className="skills-card skills-card-backend interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Database className="skills-icon skills-icon-backend" size={32} />
              <h3 className="skills-title skills-title-backend">Backend</h3>
              <div className="skills-list">
                {skills.backend.map((skill, index) => (
                  <div key={index} className="skills-list-item">{skill}</div>
                ))}
              </div>
            </div>
            <div 
              className="skills-card skills-card-ml interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Brain className="skills-icon skills-icon-ml" size={32} />
              <h3 className="skills-title skills-title-ml">AI/ML</h3>
              <div className="skills-list">
                {skills.ml.map((skill, index) => (
                  <div key={index} className="skills-list-item">{skill}</div>
                ))}
              </div>
            </div>
            <div 
              className="skills-card skills-card-tools interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Gamepad2 className="skills-icon skills-icon-tools" size={32} />
              <h3 className="skills-title skills-title-tools">Tools</h3>
              <div className="skills-list">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="skills-list-item">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section animate-on-scroll">
        <div className="projects-container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card interactive-element${project.featured ? ' project-card-featured' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="project-card-content">
                  <div className="project-card-header">
                    <h3 className={`project-title${project.featured ? ' project-title-featured' : ''}`}>
                      {project.title}
                      {project.featured && (
                        <span className="project-featured-badge">
                          ⚡ Featured
                        </span>
                      )}
                    </h3>
                    {project.private && (
                      <span className="project-private-badge">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="project-desc">
                    {project.description}
                  </p>
                  <div className="project-tech-list">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="project-tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-stack-list">
                    {project.stack.map((item, i) => (
                      <span key={i} className="project-stack-item">{item}</span>
                    ))}
                  </div>
                  <div className="project-demo-row">
                    <span className="project-demo-note">Demo can be shown on Meet or in a real meeting</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Plans Section */}
      <section id="services" className="services-section animate-on-scroll">
        <div className="services-container">
          <h2 className="section-title">Services & Plans</h2>
          <div className="services-grid">
            {/* Single Page Website */}
            <div className="service-card crazy-animate">
              <div className="service-icon" style={{color: '#3b82f6'}}><Code size={32} /></div>
              <h3 className="service-title" style={{background: 'linear-gradient(90deg, #3b82f6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Single Page Website
              </h3>
              <ul className="service-list">
                <li>✔ Responsive design</li>
                <li>✔ Custom styling</li>
                <li>✔ Contact form</li>
                <li>✔ SEO optimization</li>
              </ul>
              <p className="service-desc">Perfect for personal portfolios, landing pages, or simple business presence.</p>
              <a className="service-btn" style={{background: '#23264a', color: '#fff', boxShadow: '0 0 8px #23264a'}} href="mailto:prince0862gupta@gmail.com?subject=Request%20Quote%20-%20Single%20Page">Request Quote</a>
            </div>
            {/* Multi-Page Website (Most Popular) */}
            <div className="service-card service-card-popular crazy-animate" style={{borderColor: '#3b82f6', background: 'linear-gradient(135deg, #23264a 60%, #181c2a 100%)'}}>
              <div className="service-popular-ribbon" style={{background: '#23264a'}}>Most Popular</div>
              <div className="service-icon" style={{color: '#6366f1'}}><Database size={32} /></div>
              <h3 className="service-title" style={{background: 'linear-gradient(90deg, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Multi-Page Website
              </h3>
              <ul className="service-list">
                <li>✔ Up to 5 pages</li>
                <li>✔ Responsive design</li>
                <li>✔ Content management</li>
                <li>✔ SEO optimization</li>
                <li>✔ Google Analytics</li>
              </ul>
              <p className="service-desc">Ideal for small businesses, blogs, and professional services.</p>
              <a className="service-btn" style={{background: '#23264a', color: '#fff', boxShadow: '0 0 8px #23264a'}} href="mailto:prince0862gupta@gmail.com?subject=Request%20Quote%20-%20Multi-Page">Request Quote</a>
            </div>
            {/* Full Stack Web Application */}
            <div className="service-card crazy-animate">
              <div className="service-icon" style={{color: '#6366f1'}}><Brain size={32} /></div>
              <h3 className="service-title" style={{background: 'linear-gradient(90deg, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Full Stack Web Application
              </h3>
              <ul className="service-list">
                <li>✔ Frontend + Backend</li>
                <li>✔ User authentication</li>
                <li>✔ Database integration</li>
                <li>✔ API development</li>
                <li>✔ Admin dashboard</li>
              </ul>
              <p className="service-desc">Great for e-commerce, membership sites, and data-driven applications.</p>
              <a className="service-btn" style={{background: '#23264a', color: '#fff', boxShadow: '0 0 8px #23264a'}} href="mailto:prince0862gupta@gmail.com?subject=Request%20Quote%20-%20Full%20Stack">Request Quote</a>
            </div>
          </div>
          {/* Custom Requirements & Approach */}
          <div className="services-info-row">
            <div className="services-info-card crazy-animate">
              <h4 className="services-info-title">Custom Requirements?</h4>
              <p>Each project is unique. Contact me for a custom quote tailored to your specific needs and requirements.</p>
            </div>
            <div className="services-info-card crazy-animate">
              <h4 className="services-info-title">How I Work</h4>
              <ol className="services-approach-list">
                <li>Discovery & understanding your needs</li>
                <li>Clear proposal & transparent agreement</li>
                <li>Creative design & robust development</li>
                <li>Thorough testing & collaborative feedback</li>
                <li>Launch, support & future improvements</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section animate-on-scroll">
        <div className="experience-container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-list">
            <div className="experience-card experience-card-current">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">ML/MERN Stack Intern</h3>
                  <p className="experience-company">We360.ai, Bhopal</p>
                </div>
                <span className="experience-date">Current</span>
              </div>
              <ul className="experience-details">
                <li>• Developing advanced NLP models for workplace analytics and behavioral predictions</li>
                <li>• Building scalable web applications using MERN stack with performance optimizations</li>
                <li>• Building scalable web applications using MERN stack with performance optimizations</li>
                <li>• Creating automation tools for data extraction and AI-powered content generation</li>
                <li>• Collaborating on machine learning projects utilizing TensorFlow and scikit-learn</li>
                <li>• Optimizing data processing pipelines for efficient model training and analysis</li>
              </ul>
            </div>
            <div className="experience-card experience-card-past">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">MERN Stack Intern</h3>
                  <p className="experience-company">We Win Limited</p>
                </div>
                <span className="experience-date">Sep 2024 - Nov 2024</span>
              </div>
              <ul className="experience-details">
                <li>• Collaborated with teams to ensure scalability and performance improvements</li>
                <li>• Worked on machine learning projects for predictive analytics</li>
                <li>• Optimized data processing pipelines for model training and analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section animate-on-scroll">
        <div className="contact-container">
          <h2 className="section-title">Let's Build Something Amazing Together</h2>
          <p className="contact-desc">
            I'm always excited to work on new projects and collaborate with fellow developers and innovators.
          </p>
          <div className="contact-btn-row">
            <a 
              href="mailto:prince0862gupta@gmail.com"
              className="contact-btn contact-btn-primary interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Mail size={20} />
              Email Me
            </a>
            <a 
              href="tel:+916394590862"
              className="contact-btn contact-btn-secondary interactive-element"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Phone size={20} />
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            © 2025 Prince Gupta. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;