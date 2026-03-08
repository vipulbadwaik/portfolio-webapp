import {
  User, Code, Briefcase, GraduationCap, Mail,
  Github, Linkedin, Twitter, ExternalLink, MapPin,
} from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/StaggerChildren';
import TimelineDot from '../components/TimelineDot';
import SkillCloud from '../components/SkillCloud';
import HeroAvatar from '../components/HeroAvatar';
import ContactForm from '../components/ContactForm';
import { skills, experience, projects, education, socials } from '../data/portfolioData';

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
                <p className="text-lg text-gray-400 mb-4">
                  Full Stack Developer & UI/UX Enthusiast
                </p>
              </FadeIn>
              <FadeIn direction="none" delay={0.3} duration={0.6}>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    India
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
                    Available for work
                  </span>
                </div>
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
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a Frontend AI Engineer with 3+ years of experience building scalable web applications using React and TypeScript. I specialize in creating intuitive user interfaces and integrating AI-powered features into modern web products. My focus is on building performant, user-centric applications that seamlessly connect frontend systems with intelligent backend services. I&apos;m passionate about combining strong frontend engineering with AI capabilities to deliver smarter and more interactive digital experiences.
              </p>
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
              <div className="relative">
                {/* Animated gradient timeline line */}
                <div className="absolute left-[4px] top-3 bottom-3 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent timeline-glow" />

                <StaggerContainer className="space-y-8">
                  {experience.map((job, i) => (
                    <StaggerItem key={i}>
                      <div className="flex gap-4">
                        <div className="pt-1.5 shrink-0 relative z-10">
                          <TimelineDot isFirst={i === 0} />
                        </div>
                        <div className="pb-1 -mx-2 px-2 py-1 rounded-lg hover:bg-white/[0.03] transition-colors duration-300">
                          <h3 className="text-white font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-500 mb-1">
                            {job.company} &middot; {job.period}
                          </p>
                          {Array.isArray(job.description) ? (
                            <ul className="text-sm text-gray-400 space-y-2 mt-1.5">
                              {job.description.map((point, j) => (
                                <li key={j} className="flex gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400">{job.description}</p>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
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
              <div>
                <h3 className="text-white font-medium">{education.degree}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {education.school} &middot; {education.period}
                </p>
                <p className="text-sm text-gray-400">{education.field} &middot; {education.description}</p>
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
    </>
  );
}
