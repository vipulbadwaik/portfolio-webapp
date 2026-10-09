'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSent(true);
        formRef.current.reset();
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-6 text-center"
      >
        <CheckCircle className="w-8 h-8 text-green-400" />
        <p className="text-white font-medium">Message sent!</p>
        <p className="text-sm text-gray-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-4">
      {/* Honeypot — hidden from users, bots tend to fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full px-3.5 py-3 text-base sm:text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-3.5 py-3 text-base sm:text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
      </div>
      <div>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="Your message..."
          className="w-full px-3.5 py-3 text-base sm:text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-black bg-white rounded-lg hover:bg-accent-soft disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
