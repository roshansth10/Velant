'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, Check } from 'lucide-react';
import { useShop } from '@/lib/store';

export default function ContactPage() {
  const { showToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product / Drop Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast is delivery across Kathmandu Valley and outside?',
      a: 'Orders inside Kathmandu, Lalitpur, and Bhaktapur are dispatched same-day or delivered next-day (within 24 hours). For outside valley locations like Pokhara, Butwal, Biratnagar, Narayangarh, and Dharan, delivery takes 2 to 3 business days via Nepal Express Courier.',
    },
    {
      q: 'What payment methods do you support in Nepal?',
      a: 'We support eSewa, Khalti Digital Wallet, Direct Corporate Bank Transfer (Nabil Bank & Global IME Bank), and Cash on Delivery (COD) anywhere in Nepal.',
    },
    {
      q: 'Can I exchange for a different size if the fit is too boxy?',
      a: 'Yes, we offer a hassle-free 7-day exchange policy. As long as the item is unworn with original tags attached, contact us and our rider will arrange an exchange swap at your doorstep in Kathmandu Valley, or via courier elsewhere.',
    },
    {
      q: 'Where can I touch and try on the pieces in person?',
      a: 'You are welcome to visit our Flagship Showroom on Durbar Marg, Kathmandu (opposite Kings Way), open Sunday through Friday from 10:00 AM to 8:00 PM.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your message has been sent to our Kathmandu support team.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 font-medium">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-1">
            Connect With VELANT
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Have questions about fit, custom corporate drops, or international orders? Our Kathmandu
            team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Send Us a Direct Dispatch
              </h2>

              {isSubmitted ? (
                <div className="p-6 bg-neutral-900 border border-emerald-800 rounded-lg text-center space-y-3 font-mono text-xs">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-white font-bold text-sm">Thank You for Reaching Out</p>
                  <p className="text-neutral-400 font-light">
                    Our Kathmandu concierge desk will respond to your inquiry within 2 to 4 business hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-4 py-2 bg-white text-black font-bold uppercase rounded"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 block mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Suman Shakya"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="suman@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1.5">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                    >
                      <option value="Product / Drop Inquiry">Product / Drop Inquiry</option>
                      <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                      <option value="Exchange or Returns">Exchange or Returns</option>
                      <option value="Wholesale & Collaborations">Wholesale & Collaborations</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1.5">Message *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you need assistance with..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white h-32"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* FAQ Accordion */}
            <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Frequently Asked Inquiries
              </h2>

              <div className="divide-y divide-neutral-900">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-mono text-xs text-neutral-300 hover:text-white"
                    >
                      <span className="font-semibold">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform flex-shrink-0 ml-2 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <p className="mt-2 text-xs font-light text-neutral-400 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: HQ and Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-xl space-y-6 text-xs font-mono">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Kathmandu Flagship & Studio
              </h2>

              <div className="space-y-4 text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">VELANT Flagship Atelier</strong>
                    <span>Durbar Marg (Opp. Kings Way Galleria)</span>
                    <br />
                    <span>Kathmandu 44600, Nepal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Opening Hours</strong>
                    <span>Sunday – Friday: 10:00 AM – 8:00 PM</span>
                    <br />
                    <span>Saturday: 11:00 AM – 7:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Direct Inquiries</strong>
                    <span>Support: +977 1-4268990</span>
                    <br />
                    <span>WhatsApp / Viber: +977 9841-998877</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Electronic Mail</strong>
                    <span>concierge@velant.com</span>
                    <br />
                    <span>orders@velant.com</span>
                  </div>
                </div>
              </div>

              {/* Delivery notice card */}
              <div className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-800 space-y-1 text-[11px] text-neutral-400">
                <p className="text-white font-bold">Express Nepal Delivery</p>
                <p>Orders confirmed by 2:00 PM are delivered same-day in Kathmandu & Lalitpur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
