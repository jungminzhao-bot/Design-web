import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  ArrowUpRight, 
  Globe, 
  Cpu, 
  Layout, 
  Zap, 
  Menu, 
  X,
  ChevronRight,
  Sparkles,
  School,
  Brain
} from "lucide-react";
import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { translations, Language } from "./translations";
import portraitImage from "./assets/images/regenerated_image_1778228497131.png";

// --- Global Context ---
const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.en;
}>({
  lang: "en",
  setLang: () => {},
  t: translations.en
});

const useTranslation = () => useContext(LanguageContext);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-border-light py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-[10px] tracking-tight">JMZ</span>
          </div>
          <span className="font-bold tracking-tight text-xl uppercase leading-none mt-1">JUNGMINZHAO</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {[
            { key: "about", label: t.nav.about },
            { key: "system", label: t.nav.system },
            { key: "full-stack", label: t.nav.fullLink },
            { key: "knowledge-base", label: t.nav.matrix },
            { key: "footprint", label: t.nav.footprint },
            { key: "work", label: t.nav.work },
            { key: "contact", label: t.nav.contact }
          ].map((item, i) => (
            <motion.a
              key={item.key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={`#${item.key}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[13px] font-medium tracking-widest uppercase hover:text-accent transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <div className="h-4 w-[1px] bg-border-light" />
          <div className="flex gap-4 text-[11px] font-mono font-bold tracking-widest">
            <button 
              onClick={() => setLang('en')}
              className={`hover:text-accent transition-colors ${lang === 'en' ? 'text-accent underline underline-offset-4' : 'text-text-muted'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('zh')}
              className={`hover:text-accent transition-colors ${lang === 'zh' ? 'text-accent underline underline-offset-4' : 'text-text-muted'}`}
            >
              中文
            </button>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border-light overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {[
                { key: "about", label: t.nav.about },
                { key: "system", label: t.nav.system },
                { key: "full-stack", label: t.nav.fullLink },
                { key: "knowledge-base", label: t.nav.matrix },
                { key: "footprint", label: t.nav.footprint },
                { key: "work", label: t.nav.work },
                { key: "contact", label: t.nav.contact }
              ].map((item) => (
                <a 
                  key={item.key} 
                  href={`#${item.key}`} 
                  className="text-xl font-bold uppercase tracking-tight" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border-light flex gap-6 font-mono text-sm">
                <button onClick={() => { setLang('en'); setIsMenuOpen(false); }} className={lang === 'en' ? 'text-accent' : ''}>ENGLISH</button>
                <button onClick={() => { setLang('zh'); setIsMenuOpen(false); }} className={lang === 'zh' ? 'text-accent' : ''}>中文</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  
  // Mouse tracking logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -0.5 to 0.5
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  }, [mouseX, mouseY]);

  // Transformed values for parity
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  
  const moveX1 = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const moveY1 = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  
  const moveX2 = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const moveY2 = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  const moveX3 = useTransform(smoothX, [-0.5, 0.5], [-50, 50]);
  const moveY3 = useTransform(smoothY, [-0.5, 0.5], [50, -50]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-white"
    >
      {/* Immersive Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/50 -z-10" />
      
      {/* Reactive Elements Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Floating Ring */}
        <motion.div 
          style={{ x: moveX1, y: moveY1, rotateX, rotateY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -right-20 w-[800px] h-[800px] border border-brand/5 rounded-full"
        />
        
        {/* Deep Field Grid */}
        <motion.div 
          style={{ x: moveX2, y: moveY2 }}
          className="absolute inset-0 opacity-[0.03]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
        >
          <div className="w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} />
        </motion.div>

        {/* Floating Technical Symbols */}
        <motion.div 
          style={{ x: moveX3, y: moveY3 }}
          className="absolute top-1/3 left-10 p-12 border border-brand/10 rounded-full opacity-10"
        >
          <Sparkles size={120} className="text-brand" />
        </motion.div>

        <motion.div 
          style={{ x: moveX2, y: moveY1 }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 border-l border-t border-brand/20 opacity-20"
        />
        
        <motion.div 
          style={{ x: moveY2, y: moveX3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-brand/[0.02] rounded-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-center min-h-[80vh]">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mono-label text-accent font-bold mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-accent" />
            {t.hero.location}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase mb-12"
          >
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="text-xl text-text-muted leading-relaxed font-light mb-12 max-w-md">
              {t.hero.subtitle}
            </p>
            <div className="flex items-center gap-10">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-brand text-white px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-widest transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.cta} <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="lg:col-span-7 flex justify-end"
          >
            <div className="text-right border-r-2 border-brand/10 pr-8">
              <div className="text-6xl font-light italic mb-2 tracking-tighter">{t.hero.years}</div>
              <div className="mono-label text-accent">{t.hero.collection}</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Technical Layer */}
      <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end px-6 font-mono text-[9px] text-brand/40 tracking-[0.3em] uppercase">
        <div className="flex flex-col gap-1">
          <div>{t.hero.visualSystems}</div>
          <div>INTERNAL_PROTOCOL // {t.hero.culturalDna}</div>
        </div>
        <div className="text-right">
          <div>{t.hero.systemInit}</div>
          <div>SCROLL_TO_EXPLORE ↓</div>
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = (t.work.projects as any[]).filter(project => 
    activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section id="work" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-brand pt-12 flex flex-col md:flex-row justify-between items-start mb-12 gap-8"
        >
          <h2 className="text-4xl font-bold tracking-tight uppercase">{t.work.title}</h2>
          <p className="max-w-xs mono-label lowercase">
            {t.work.desc}
          </p>
        </motion.div>

        {/* Sub-navigation Filter */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 border-b border-border-light pb-8">
          {(t.work.categories as any[]).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`mono-label text-[11px] uppercase tracking-[0.2em] transition-all relative py-2 ${
                activeCategory === cat.id ? "text-accent" : "text-brand/40 hover:text-brand"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] bg-border-light overflow-hidden mb-6 group-hover:shadow-2xl transition-shadow duration-500">
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-brand/5" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="mono-label text-brand font-bold">
                      {(t.work.categories as any[]).find(c => c.id === project.category)?.label || project.category}
                    </span>
                    <span className="mono-label italic text-[9px]">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center mono-label text-text-muted italic">
            COMING SOON / 正在更新中...
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-auto max-h-[80vh] object-contain shadow-2xl"
              />
              <div className="mt-8 text-center text-white">
                <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">{selectedProject.title}</h3>
                <div className="mono-label text-xs text-white/40 tracking-[0.2em] uppercase">
                  {selectedProject.location} — {(t.work.categories as any[]).find(c => c.id === selectedProject.category)?.label}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-top">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mono-label text-accent font-bold mb-6">02 // PROFILE</div>
            <h2 className="text-5xl font-bold tracking-tighter uppercase mb-12">
              <span className="italic font-light">{t.about.title}</span>
            </h2>
              <div className="group aspect-[4/5] bg-border-light relative overflow-hidden transition-all duration-700 mb-8 border border-brand/5">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={portraitImage}
                  alt="Designer Portrait"
                  className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 transition-all duration-1000"
                />
                <div className="absolute bottom-6 left-6 mono-label text-black bg-white px-3 py-1">
                  {t.about.role}
                </div>
              </div>
          </motion.div>

          <div className="space-y-16 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-10"
            >
              <div className="text-4xl font-bold text-accent">{t.about.experienceVal}</div>
              <div>
                <h4 className="mono-label text-brand font-bold mb-3">{t.about.experience}</h4>
                <p className="text-text-muted leading-relaxed font-light">{t.about.experienceDesc}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-10"
            >
              <div className="text-4xl font-bold text-accent">{t.about.volumeVal}</div>
              <div>
                <h4 className="mono-label text-brand font-bold mb-3">{t.about.volume}</h4>
                <p className="text-text-muted leading-relaxed font-light">{t.about.volumeDesc}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-t border-border-light pt-12"
            >
              <h4 className="mono-label text-brand font-bold mb-6">{t.about.background}</h4>
              <p className="text-xl text-brand font-light leading-relaxed mb-8">
                {t.about.backgroundDesc}
              </p>
              <button className="mono-label text-brand border-b border-brand pb-1 hover:text-accent hover:border-accent transition-all">
                Download Resume (PDF)
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceSystemSection = () => {
  const { t } = useTranslation();
  return (
    <section id="system" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-brand pt-12 flex flex-col md:flex-row justify-between items-start mb-20 gap-8"
        >
          <h2 className="text-4xl font-bold tracking-tight uppercase leading-tight max-w-2xl">{t.serviceSystem.title}</h2>
          <p className="max-w-xs mono-label lowercase">
            {t.serviceSystem.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {t.serviceSystem.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <div className="aspect-[3/4] bg-border-light overflow-hidden mb-8 relative border border-brand/5">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 transition-all duration-700"
                />
              </div>
              <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">{item.title}</h4>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const { t } = useTranslation();
  return (
    <section id="process" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-brand pt-12 flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <h2 className="text-4xl font-bold tracking-tight uppercase">{t.process.title}</h2>
          <p className="max-w-xs mono-label lowercase">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {t.process.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-video bg-border-light overflow-hidden mb-6 relative">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 transition-all duration-700"
                />
              </div>
              <div className="flex gap-4">
                <span className="mono-label text-accent font-bold mt-1">0{i + 1}</span>
                <div>
                  <h4 className="text-xl font-bold mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FullStackSection = () => {
  const { t } = useTranslation();
  return (
    <section id="full-stack" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-brand pt-12 flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <h2 className="text-4xl font-bold tracking-tight uppercase leading-tight max-w-2xl">{t.fullStack.title}</h2>
          <p className="max-w-xs mono-label lowercase">
            {t.fullStack.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {t.fullStack.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <div className="aspect-square bg-border-light overflow-hidden mb-8 relative border border-brand/5">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/5 group-hover:opacity-0 transition-opacity duration-700" />
              </div>
              <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KnowledgeBaseSection = () => {
  const { t } = useTranslation();
  return (
    <section id="knowledge-base" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="mono-label text-accent font-bold mb-6">DATABASE // ASSETS</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight mb-8">
              {t.knowledgeBase.title}
            </h2>
            <p className="text-xl font-bold text-accent mb-8">
              {t.knowledgeBase.subtitle}
            </p>
            <p className="text-lg text-text-muted leading-relaxed font-light mb-10">
              {t.knowledgeBase.desc}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-border-light pt-10">
              <div>
                <div className="text-4xl font-bold text-brand">100+</div>
                <div className="mono-label text-xs mt-2 uppercase">Blueprint sets</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand">5+</div>
                <div className="mono-label text-xs mt-2 uppercase">Years of deep research</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group order-1 lg:order-2 aspect-[4/3] bg-border-light overflow-hidden shadow-2xl relative border border-brand/5"
          >
            <img 
              src={t.knowledgeBase.image}
              alt="Knowledge Base"
              className="w-full h-full object-cover blur-sm saturate-[0.3] group-hover:blur-none group-hover:saturate-100 scale-110 group-hover:scale-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-brand/5 group-hover:opacity-0 transition-opacity duration-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  const { t } = useTranslation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="footprint" className="py-40 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mono-label text-accent font-bold mb-4"
          >
            03 // PROJECT FOOTPRINT
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6"
          >
            {t.footprint.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t.footprint.desc}
          </motion.p>
        </div>

        {/* Chronological History Timeline */}
        <div className="relative mt-20 max-w-4xl mx-auto px-6">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-border-light -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-24 relative">
            {t.footprint.history.map((period, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row items-start gap-8 md:gap-0 cursor-pointer group/item ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`transition-colors duration-300 font-bold text-2xl mb-4 tracking-tighter ${hoveredIdx === idx ? "text-accent" : "text-brand"}`}>
                    {period.period}
                  </div>
                  <h3 className={`text-2xl font-bold mb-8 tracking-tight uppercase leading-none transition-colors duration-300 ${hoveredIdx === idx ? "text-accent" : "text-brand"}`}>
                    {period.focus}
                  </h3>
                  <div className={`flex flex-wrap gap-x-4 gap-y-2 ${idx % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    {period.schools.map((school, sIdx) => (
                      <span 
                        key={sIdx} 
                        className={`text-text-muted text-xs font-light tracking-wide py-1 px-3 bg-surface border transition-all cursor-default ${
                          hoveredIdx === idx ? "border-accent text-brand" : "border-border-light"
                        }`}
                      >
                        {school}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline Dot Central */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    animate={{ 
                      scale: hoveredIdx === idx ? 1.5 : 1,
                      backgroundColor: hoveredIdx === idx ? "#c1a17b" : "#eee"
                    }}
                    className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(193,161,123,0.5)]" 
                  />
                </div>

                {/* Spacer Side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[15vw] font-bold text-brand/[0.01] -z-10 select-none whitespace-nowrap">
        CHINA ROOTS // 華夏根基
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-40 bg-white overflow-hidden relative border-t border-border-light">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <div className="mono-label mb-10 flex justify-center items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {t.contact.status}
        </div>
        <h2 className="heading-xl mb-16 tracking-tighter uppercase whitespace-pre-line">
          {t.contact.heading}
        </h2>
        <a href="mailto:jungminzhao@163.com" className="text-4xl md:text-6xl font-bold tracking-tight hover:text-accent transition-all inline-block border-b-2 border-brand pb-2">
          jungminzhao@163.com
        </a>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-12 bg-white border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="mono-label text-[10px]">
          {t.footer.copyright}
        </div>
        <div className="flex gap-12 mono-label text-[10px]">
          <a href="#" className="text-brand hover:underline">INSTAGRAM</a>
          <a href="#" className="text-brand hover:underline">BEHANCE</a>
          <a href="#" className="text-brand hover:underline">LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <main className="selection:bg-brand selection:text-white">
        <Navbar />
        <Hero />
        <AboutSection />
        <ProcessSection />
        <ServiceSystemSection />
        <FullStackSection />
        <KnowledgeBaseSection />
        <MapSection />
        <WorkSection />
        <Contact />
        <Footer />
      </main>
    </LanguageContext.Provider>
  );
}
