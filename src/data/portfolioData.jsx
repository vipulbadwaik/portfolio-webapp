import React from 'react';
import { User, Briefcase, Code, GraduationCap, FileText, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const portfolioItems = [
  {
    id: 'about',
    title: 'About Me',
    className: 'md:col-span-4 md:row-span-2',
    icon: <User className="w-6 h-6 text-blue-400" />,
    description: "I'm a passionate developer crafting digital experiences.",
    content: (
      <div className="p-4">
        <p className="text-lg text-gray-300 leading-relaxed">
          I specialize in building high-quality web applications with modern technologies.
          My journey involves deep diving into React, Node.js, and creative coding.
        </p>
      </div>
    ),
    detailedContent: (
      <div className="space-y-6">
        <h2 className="text-4xl font-display font-bold text-white">About Me</h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Hello! I'm Vipul, a software engineer with a knack for creating stunning and functional web applications.
          I love experimenting with new libraries and frameworks to push the boundaries of what's possible on the web.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Frontend</h3>
            <p className="text-gray-400">React, Vue, Next.js, Tailwind CSS, Framer Motion, GSAP, Three.js</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Backend</h3>
            <p className="text-gray-400">Node.js, Express, Python, Django, PostgreSQL, MongoDB</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'projects',
    title: 'Projects',
    className: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20',
    icon: <Code className="w-6 h-6 text-purple-400" />,
    description: "Showcase of my recent work.",
    content: (
      <div className="mt-4 space-y-2">
        <div className="h-2 bg-white/10 rounded w-3/4"></div>
        <div className="h-2 bg-white/10 rounded w-1/2"></div>
      </div>
    ),
    detailedContent: (
      <div className="space-y-8">
        <h2 className="text-4xl font-display font-bold text-white">My Projects</h2>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="aspect-video bg-black/40" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Project {i}</h3>
                <p className="text-gray-400 mb-4">A cutting-edge application built with the latest tech stack.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">React</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">Node</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'experience',
    title: 'Experience',
    className: 'md:col-span-2 md:row-span-1',
    icon: <Briefcase className="w-6 h-6 text-green-400" />,
    description: "My professional journey.",
    content: <div className="text-sm text-gray-400 mt-2">2+ Years of Experience</div>,
    detailedContent: (
      <div className="space-y-6">
        <h2 className="text-4xl font-display font-bold text-white">Experience</h2>
        <div className="space-y-8 border-l-2 border-white/10 pl-8 ml-4">
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-[#1a1a1a]" />
            <h3 className="text-2xl font-bold text-white">Senior Developer</h3>
            <p className="text-green-400">Tech Corp • 2023 - Present</p>
            <p className="text-gray-400 mt-2">Leading the frontend team and architecting scalable solutions.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-[#1a1a1a]" />
            <h3 className="text-2xl font-bold text-white">Web Developer</h3>
            <p className="text-gray-400">Startup Inc • 2021 - 2023</p>
            <p className="text-gray-400 mt-2">Built and maintained multiple client-facing web applications.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'skills',
    title: 'Skills',
    className: 'md:col-span-2 md:row-span-1',
    icon: <Code className="w-6 h-6 text-yellow-400" />,
    description: "Technologies I work with.",
    content: (
      <div className="flex flex-wrap gap-2 mt-2">
        {['React', 'Node', 'GSAP', 'Three.js'].map(skill => (
          <span key={skill} className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300">{skill}</span>
        ))}
      </div>
    ),
    detailedContent: (
      <div className="space-y-6">
        <h2 className="text-4xl font-display font-bold text-white">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker', 'Figma', 'GSAP', 'Three.js', 'PostgreSQL'].map(skill => (
            <div key={skill} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
              <span className="text-gray-200 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'education',
    title: 'Education',
    className: 'md:col-span-2 md:row-span-1',
    icon: <GraduationCap className="w-6 h-6 text-pink-400" />,
    description: "Academic background.",
    content: <div className="text-sm text-gray-400 mt-2">B.Tech in Computer Science</div>,
    detailedContent: (
      <div className="space-y-6">
        <h2 className="text-4xl font-display font-bold text-white">Education</h2>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold text-white">Bachelor of Technology</h3>
          <p className="text-pink-400">Computer Science & Engineering</p>
          <p className="text-gray-400 mt-2">2018 - 2022</p>
          <p className="text-gray-400 mt-4">Graduated with Honors. Focused on Algorithms and Web Technologies.</p>
        </div>
      </div>
    )
  },
  {
    id: 'resume',
    title: 'Resume',
    className: 'md:col-span-2 md:row-span-1',
    icon: <FileText className="w-6 h-6 text-orange-400" />,
    description: "Download my CV.",
    content: <div className="text-sm text-blue-400 mt-2 underline">View Resume</div>,
    detailedContent: (
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-display font-bold text-white">Resume</h2>
        <div className="aspect-[1/1.4] w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative group">
           <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
               Download PDF
             </button>
           </div>
           <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
             Resume Preview Placeholder
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'contact',
    title: 'Contact',
    className: 'md:col-span-2 md:row-span-1',
    icon: <Mail className="w-6 h-6 text-red-400" />,
    description: "Get in touch.",
    content: <div className="text-sm text-gray-400 mt-2">vipul@example.com</div>,
    detailedContent: (
      <div className="space-y-6">
        <h2 className="text-4xl font-display font-bold text-white">Contact Me</h2>
        <form className="space-y-4 max-w-lg mx-auto">
          <input type="text" placeholder="Name" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none transition-colors" />
          <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none transition-colors" />
          <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 outline-none transition-colors" />
          <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    )
  },
  {
    id: 'social',
    title: 'Social',
    className: 'md:col-span-2 md:row-span-1',
    icon: <Github className="w-6 h-6 text-white" />,
    description: "Connect with me.",
    content: (
      <div className="flex gap-4 mt-4">
        <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
        <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
      </div>
    ),
    detailedContent: (
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-display font-bold text-white">Socials</h2>
        <div className="flex justify-center gap-8 mt-8">
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <Github className="w-8 h-8 text-white" />
            </div>
            <span className="text-gray-400 group-hover:text-white">GitHub</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 group">
             <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-500/20 transition-colors">
              <Linkedin className="w-8 h-8 text-white group-hover:text-blue-400" />
            </div>
            <span className="text-gray-400 group-hover:text-blue-400">LinkedIn</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 group">
             <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-400/20 transition-colors">
              <Twitter className="w-8 h-8 text-white group-hover:text-blue-400" />
            </div>
            <span className="text-gray-400 group-hover:text-blue-400">Twitter</span>
          </a>
        </div>
      </div>
    )
  }
];
