import {
  User, Code, Briefcase, GraduationCap, Mail,
  Github, Linkedin, Twitter, MapPin, Download, ArrowRight,
  School, Award, Globe,
} from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/StaggerChildren';
import ExperienceCard from '../components/ExperienceCard';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillCloud from '../components/SkillCloud';
import HeroAvatar from '../components/HeroAvatar';
import HeroName from '../components/HeroName';
import HeroTagline from '../components/HeroTagline';
import ContactForm from '../components/ContactForm';
import CopyEmail from '../components/CopyEmail';
import Chatbot from '../components/Chatbot';
import Astronaut from '../components/Astronaut';
import Walker from '../components/Walker';
import { RESUME_URL } from '../lib/site';
import { skillGroups, experience, education, socials } from '../data/portfolioData';

const stats = [
  { value: '3+', label: 'Years', sub: 'Professional experience' },
  { value: '2', label: 'Companies', sub: 'Capgemini · Fundly.ai' },
  { value: 'Fintech', label: 'Domain', sub: 'Lending, KYC & payments' },
  { value: education.description.replace('CGPA: ', ''), label: 'CGPA', sub: 'B.Tech, CSE' },
];

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:text-sm">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
      {/* Hero cover with masked grid + accent glow — full width */}
      <div className="relative border-b border-white/10 overflow-hidden">
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div className="grid-pattern absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto border-x border-white/10 px-5 sm:px-6 py-14 sm:py-20 md:py-28">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-10 md:gap-8">
            <div className="md:mr-12">
              <HeroAvatar />
            </div>
            <div className="text-center md:text-left md:order-first">
              <HeroName className="text-[2.6rem] leading-[1.05] sm:text-6xl font-display font-bold mb-4" />
              <FadeIn direction="none" delay={0.15} duration={0.6}>
                <HeroTagline />
              </FadeIn>
              <FadeIn direction="none" delay={0.3} duration={0.6}>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    Mumbai, India
                  </span>
                  <span
                    tabIndex={0}
                    className="group relative flex items-center gap-2 cursor-default rounded-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
                    Available for work
                    <div className="absolute left-1/2 top-full z-20 mt-3 w-[min(18rem,calc(100vw-2.5rem))] -translate-x-1/2 origin-top scale-95 rounded-xl border border-white/10 bg-[#111] p-4 text-left shadow-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100 pointer-events-none">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-[2px] border-l border-t border-white/10 bg-[#111]" />
                      <p className="flex items-center gap-2 text-xs font-semibold text-white mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Open to new opportunities
                      </p>
                      <p className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                        <Globe className="w-3.5 h-3.5 text-accent" /> Remote — from anywhere
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Bangalore', 'Hyderabad', 'Gurgaon', 'Pune'].map((city) => (
                          <span key={city} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
                            <MapPin className="w-3 h-3 text-gray-400" /> {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
              </FadeIn>
              <FadeIn direction="none" delay={0.45} duration={0.6}>
                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-accent-soft hover-lift transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-sm font-medium text-white hover:border-accent/60 hover:bg-accent/10 transition-colors"
                  >
                    Contact me
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* About + Skills section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-5 sm:px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="about" number="01" title="About" icon={<User className="w-4 h-4" />}>
              <div className="space-y-5">
                <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
                  I&apos;m an <span className="text-white font-semibold">AI-native Software Engineer</span> with 3+ years of experience building scalable web products with React, TypeScript and Java — using agentic AI across planning, coding and review to ship faster, and building AI-powered features into the products themselves.
                </p>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  From a multi-tenant onboarding SDK and high-volume payment flows to an in-house CRM, I own features end to end — frontend, APIs and data — combining strong engineering fundamentals with AI-driven workflows to deliver reliable, performant products.
                </p>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat) => (
                    <StaggerItem key={stat.label}>
                      <div className="card hover-lift p-4 rounded-xl h-full">
                        <p className="font-display text-2xl sm:text-[1.7rem] font-bold leading-none text-accent-gradient">{stat.value}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{stat.label}</p>
                        <p className="text-xs text-gray-400 leading-snug mt-0.5">{stat.sub}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Section id="skills" number="02" title="Tech Stack" icon={<Code className="w-4 h-4" />}>
              <SkillCloud groups={skillGroups} />
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Experience section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-5 sm:px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="experience" number="03" title="Experience" icon={<Briefcase className="w-4 h-4" />}>
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
        <div className="max-w-3xl mx-auto border-x border-white/10 px-5 sm:px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="education" number="04" title="Education" icon={<GraduationCap className="w-4 h-4" />}>
              <div className="card hover-lift p-4 sm:p-5 rounded-xl flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-lg border border-accent/25 bg-accent/10 flex items-center justify-center text-accent">
                  <School className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-white leading-tight">{education.degree}</h3>
                  <p className="text-sm text-gray-300 mt-1">{education.school}</p>
                  <p className="font-mono text-xs text-gray-400 mt-0.5 mb-3">{education.period}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-xs text-gray-300">
                      {education.field}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-xs font-medium text-accent-soft">
                      <Award className="w-3 h-3" /> {education.description}
                    </span>
                  </div>
                  {education.achievement && (
                    <p className="mt-3 flex items-start gap-2 text-sm text-gray-300">
                      <Award className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                      {education.achievement}
                    </p>
                  )}
                </div>
              </div>
            </Section>
          </FadeIn>
        </div>
      </div>

      {/* Full-width screen-line divider */}
      <div className="screen-line h-3" />

      {/* Contact section */}
      <div className="max-w-3xl mx-auto border-x border-white/10 px-5 sm:px-6 py-10 space-y-6">
        <FadeIn>
          <Section id="contact" number="05" title="Contact" icon={<Mail className="w-4 h-4" />}>
            <div className="space-y-7">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
                  Let&apos;s build something <span className="text-accent-gradient">together.</span>
                </h3>
                <p className="mt-2 text-gray-300 text-[15px]">
                  Feel free to reach out — I&apos;m always open to new opportunities and collaborations.
                </p>
              </div>
              <CopyEmail email="vipul.badwaik@gmail.com" />
              <ContactForm />
            </div>
          </Section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <footer className="pt-6 pb-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>&copy; {new Date().getFullYear()} Vipul Badwaik</span>
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
                      rel="me noopener noreferrer"
                      className="p-3 border border-white/10 rounded-lg text-gray-300 hover:text-accent hover:border-accent/40 hover-scale transition-colors inline-block"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </footer>
        </FadeIn>
      </div>
      </main>

      <Astronaut />
      <Walker />
      <Chatbot />
    </>
  );
}
