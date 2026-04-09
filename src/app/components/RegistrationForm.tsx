import { motion } from 'motion/react';
// Registration form — validates inputs and redirects to WhatsApp with pre-filled message
import { useState } from 'react';
import { User, Building2, MapPin, Phone, Send, CheckCircle, Loader2, MessageCircle, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GOVERNORATES } from '../i18n/translations';

interface FormData {
  name: string;
  college: string;
  governorate: string;
  city: string;
  phone: string;
}

type Status = 'idle' | 'loading' | 'success';

export function RegistrationForm() {
  const { t, lang } = useLanguage();
  const r = t('register');

  const [form, setForm] = useState<FormData>({ name: '', college: '', governorate: '', city: '', phone: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>('idle');

  const govList = GOVERNORATES[lang];

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim())        newErrors.name        = r.err_name;
    if (!form.college.trim())     newErrors.college     = r.err_college;
    if (!form.governorate)        newErrors.governorate = r.err_gov;
    if (!form.city.trim())        newErrors.city        = r.err_city;
    if (!form.phone.trim()) {
      newErrors.phone = r.err_phone;
    } else if (!/^(\+20|0)?1[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = r.err_phone_invalid;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        const message = encodeURIComponent(
          r.wa_msg(form.name, form.college, form.governorate, form.city, form.phone)
        );
        window.open(`https://wa.me/201208124665?text=${message}`, '_blank');
      }, 3500); // 3.5 seconds to read
    }, 1200);
  };

  // Success state
  if (status === 'success') {
    return (
      <section
        id="register"
        className="py-16 bg-white"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{r.ok_title}</h3>
            <p className="text-slate-500 mb-6">{r.ok_desc}</p>
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="mt-6 text-slate-400 text-xs">
              {r.ok_fallback}{' '}
              <a
                href={`https://wa.me/201208124665?text=${encodeURIComponent(r.wa_msg(form.name, form.college, form.governorate, form.city, form.phone))}`}
                className="text-green-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.ok_fallback_link}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputBase =
    'w-full ps-10 pe-4 py-3 rounded-xl border text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 transition-all duration-200';

  return (
    <section
      id="register"
      className="pt-12 md:pt-16 pb-20 bg-white"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">
            {r.section_badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800">
            {r.section_title}
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">{r.section_sub}</p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-2xl p-8"
          style={{
            border: '1px solid var(--border-light)',
            boxShadow: '0 8px 40px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.04)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">{r.lbl_name} *</label>
              <div className="relative">
                <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={r.ph_name}
                  className={`${inputBase} ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.name}</p>}
            </div>

            {/* College / Institute */}
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">{r.lbl_college} *</label>
              <div className="relative">
                <Building2 className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.college}
                  onChange={(e) => handleChange('college', e.target.value)}
                  placeholder={r.ph_college}
                  className={`${inputBase} ${errors.college ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                />
              </div>
              {errors.college && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.college}</p>}
            </div>

            {/* Governorate + City — side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Governorate Dropdown */}
              <div>
                <label className="block text-sm text-slate-700 mb-1.5">{r.lbl_gov} *</label>
                <div className="relative">
                  <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                  <select
                    value={form.governorate}
                    onChange={(e) => handleChange('governorate', e.target.value)}
                    className={`${inputBase} appearance-none cursor-pointer ${
                      errors.governorate ? 'border-red-300 bg-red-50' : 'border-slate-200'
                    } ${!form.governorate ? 'text-slate-400' : 'text-slate-800'}`}
                  >
                    <option value="" disabled>{r.ph_gov}</option>
                    {govList.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.governorate && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.governorate}</p>}
              </div>

              {/* City — free text */}
              <div>
                <label className="block text-sm text-slate-700 mb-1.5">{r.lbl_city} *</label>
                <div className="relative">
                  <Home className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder={r.ph_city}
                    className={`${inputBase} ${errors.city ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  />
                </div>
                {errors.city && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.city}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-slate-700 mb-1.5">{r.lbl_phone} *</label>
              <div className="relative">
                <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={r.ph_phone}
                  className={`${inputBase} ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {errors.phone}</p>}
            </div>

            {/* Info notice */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-sm text-blue-700">
              <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
              <p>{r.wa_notice}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {r.submitting}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {r.submit}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Animated small indicator */}
        <div className="mt-8 flex justify-center">
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </div>
      </div>
    </section>
  );
}
