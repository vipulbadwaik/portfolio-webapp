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
import { skills, experience, projects, education, socials } from '../data/portfolioData';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero cover with grid pattern — full width */}
      <div className="grid-pattern border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-20 md:py-28">
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
            <div className="flex items-center gap-4 text-sm text-gray-500">
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

      {/* About + Skills section */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto border-x border-white/10 px-6 py-10 space-y-6">
          <FadeIn>
            <Section id="about" title="About" icon={<User className="w-4 h-4" />}>
              <p className="text-gray-300 leading-relaxed">
                I specialize in building high-quality web applications with modern technologies.
                My journey involves deep diving into React, Next.js, Node.js, and creative coding.
                I love experimenting with new libraries and frameworks to push the boundaries of
                what&apos;s possible on the web.
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
              <StaggerContainer className="space-y-6">
                {experience.map((job, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-4">
                      <div className="pt-1.5 flex flex-col items-center">
                        <TimelineDot />
                        {i < experience.length - 1 && (
                          <div className="w-px flex-1 bg-white/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-1">
                        <h3 className="text-white font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {job.company} &middot; {job.period}
                        </p>
                        <p className="text-sm text-gray-400">{job.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Section id="projects" title="Projects" icon={<Code className="w-4 h-4" />}>
              <StaggerContainer className="space-y-4">
                {projects.map((project, i) => (
                  <StaggerItem key={i}>
                    <a
                      href={project.url}
                      className="block p-4 -mx-2 rounded-xl hover:bg-white/5 hover-lift transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </FadeIn>
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
                  {education.field} &middot; {education.period}
                </p>
                <p className="text-sm text-gray-400">{education.description}</p>
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
            <div className="space-y-4">
              <p className="text-gray-300">
                Feel free to reach out — I&apos;m always open to new opportunities and collaborations.
              </p>
              <a
                href="mailto:vipul@example.com"
                className="inline-block text-sm text-blue-400 hover:text-blue-300 hover-underline transition-colors"
              >
                vipul@example.com
              </a>
              <StaggerContainer className="flex gap-3 pt-2">
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
          </Section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <footer className="pt-8 pb-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Vipul Badwaik
          </footer>
        </FadeIn>
      </div>
    </>
  );
}
