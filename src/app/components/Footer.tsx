// Site footer with brand info, quick links, and contact details
import { Phone, Mail, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useLanguage();
  const f = t('footer');

  return (
    <footer
      className="bg-slate-900 text-slate-400"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Logo
                imgClassName="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-white font-bold text-lg">
                Scan <span className="text-blue-400">Academy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">{f.tagline}</p>
            <div className="mt-4 flex gap-3">
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">{f.quick_links}</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/',          label: f.link_home },
                { href: '/#about',    label: f.link_about },
                { href: '/register',  label: f.link_register },
                { href: '/simulator', label: f.link_simulator },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200"
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        const hash = link.href.substring(1);
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          window.history.pushState(null, '', link.href);
                          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else if (link.href === '/' && window.location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">{f.contact_us}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:01157590990" className="hover:text-blue-400 transition-colors">
                  01157590990
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a
                  href="https://wa.me/201208124665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >WhatsApp: 01208124665</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@scanacademy.eg" className="hover:text-blue-400 transition-colors">scanacademy25@gmail.com</a>
              </li>
            </ul>

            
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>{f.copyright}</p>
          <p className="flex items-center gap-1">
            {f.made_with.split('❤')[0]}<Heart className="w-3 h-3 text-red-400" />{f.made_with.split('❤')[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}