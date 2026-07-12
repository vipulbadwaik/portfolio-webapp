import {
  User, Code, Briefcase, GraduationCap, Mail,
  Github, Linkedin, Twitter, ExternalLink, MapPin, FileText,
  Sparkles, Zap, Layers,
} from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/StaggerChildren';
import ExperienceCard from '../components/ExperienceCard';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillCloud from '../components/SkillCloud';
import HeroAvatar from '../components/HeroAvatar';
import HeroTagline from '../components/HeroTagline';
import ContactForm from '../components/ContactForm';
import Chatbot from '../components/Chatbot';
import { skills, experience, education, socials } from '../data/portfolioData';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
      {/* Hero cover with grid pattern — full width */}
      <div className="grid-pattern border-b border-white/10 overflow-hidden">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-20 md:py-28">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="md:mr-12">
              <HeroAvatar />
            </div>
            <div className="text-center md:text-left md:order-first">
              <FadeIn direction="none" duration={0.6}>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-shimmer">
                  Vipul Badwaik
                </h1>
              </FadeIn>
              <FadeIn direction="none" delay={0.15} duration={0.6}>
                <HeroTagline />
              </FadeIn>
              <FadeIn direction="none" delay={0.3} duration={0.6}>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Mumbai, India
                  </span>
                  <span className="group relative flex items-center gap-1.5 cursor-default">
                    <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
                    Available for work
                    <div className="absolute left-1/2 top-full z-20 mt-3 w-72 -translate-x-1/2 origin-top scale-95 rounded-xl border border-white/10 bg-[#111] p-4 text-left shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-[2px] border-l border-t border-white/10 bg-[#111]" />
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2.5">
                        <span>🟢</span> Open to new opportunities
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-gray-300 mb-3">
                        <span>🌍</span> Remote — from anywhere
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Bangalore', 'Hyderabad', 'Gurgaon', 'Pune'].map((city) => (
                          <span key={city} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                            📍 {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
              </FadeIn>
              <FadeIn direction="none" delay={0.45} duration={0.6}>
                <a
                  href="https://drive.google.com/file/d/17Qz92-5K-ADO32iwSwDQP9La6eI39wsP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/25 hover-lift transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* About + Skills section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="about" title="About" icon={<User className="w-4 h-4" />}>
              <div className="space-y-5">
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m a <span className="text-white font-medium">Frontend AI Engineer</span> with 3+ years of experience building scalable web applications using React and TypeScript — specializing in intuitive interfaces and AI-powered features that make modern web products smarter.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  My focus is on performant, user-centric applications that seamlessly connect frontend systems with intelligent backend services, combining strong engineering fundamentals with AI capabilities to deliver richer, more interactive digital experiences.
                </p>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <Sparkles className="w-4 h-4" />, label: '3+ Years', sub: 'Experience' },
                    { icon: <Code className="w-4 h-4" />, label: 'React & TS', sub: 'Core Stack' },
                    { icon: <Zap className="w-4 h-4" />, label: 'AI-Powered', sub: 'Interfaces' },
                    { icon: <Layers className="w-4 h-4" />, label: 'Full Stack', sub: 'Integration' },
                  ].map((stat) => (
                    <StaggerItem key={stat.label}>
                      <div className="p-3 rounded-lg border border-white/10 hover-lift transition-colors text-center h-full">
                        <div className="flex justify-center text-gray-400 mb-1.5">{stat.icon}</div>
                        <p className="text-sm font-semibold text-white">{stat.label}</p>
                        <p className="text-[11px] text-gray-500">{stat.sub}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Section id="skills" title="Tech Stack" icon={<Code className="w-4 h-4" />}>
              <SkillCloud skills={skills} />
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Experience + Projects section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="experience" title="Experience" icon={<Briefcase className="w-4 h-4" />}>
              <ExperienceTimeline>
                <StaggerContainer className="space-y-6">
                  {experience.map((job, i) => (
                    <StaggerItem key={i}>
                      <ExperienceCard job={job} index={i} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </ExperienceTimeline>
            </Section>
          </FadeIn>

          {/* Projects section hidden for now */}
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Education section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="education" title="Education" icon={<GraduationCap className="w-4 h-4" />}>
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-lg">
                  🎓
                </div>
                <div className="flex-1 -mx-2 px-4 py-4 rounded-lg border border-white/10 hover:border-white/20 hover-lift bg-white/[0.015] transition-all duration-300">
                  <h3 className="text-white font-medium">{education.degree}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 mb-2.5">
                    🏫 {education.school} &middot; {education.period}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md border border-white/10 text-[11px] text-gray-400">
                      {education.field}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] font-medium text-green-400">
                      🏆 {education.description}
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Contact section */}
      <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
        <FadeIn>
          <Section id="contact" title="Contact" icon={<Mail className="w-4 h-4" />}>
            <div className="space-y-6">
              <p className="text-gray-300">
                Feel free to reach out — I&apos;m always open to new opportunities and collaborations.
              </p>
              <ContactForm />
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="mailto:vipul.badwaik@gmail.com"
                  className="text-sm text-gray-500 hover:text-white hover-underline transition-colors"
                >
                  vipul.badwaik@gmail.com
                </a>
                <StaggerContainer className="flex gap-3">
                  {socials.map((social) => {
                    const Icon = social.name === 'GitHub' ? Github
                      : social.name === 'LinkedIn' ? Linkedin
                      : Twitter;
                    return (
                      <StaggerItem key={social.name}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 hover-scale transition-colors inline-block"
                          aria-label={social.name}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </div>
          </Section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <footer className="pt-8 pb-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Vipul Badwaik
          </footer>
        </FadeIn>
      </div>
      </main>

      <Chatbot />
    </>
  );
}
