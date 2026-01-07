import { Youtube, Linkedin, Globe, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 mt-12 print:hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold text-white">Pabpereza</h4>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Media Kit. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <SocialLink href="https://youtube.com/@pabpereza" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
          <SocialLink href="https://linkedin.com/in/pabpereza" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href="https://pabpereza.com" icon={<Globe className="w-5 h-5" />} label="Website" />
          <SocialLink href="mailto:contacto@pabpereza.com" icon={<Mail className="w-5 h-5" />} label="Email" />
        </div>

      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-white transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);
