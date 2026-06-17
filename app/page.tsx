'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? 'bg-[#fafafa]/80 backdrop-blur-sm border-b border-[#e5e5e5]' : ''}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <div className="text-[20px] font-semibold text-[#0a0a0a] tracking-tight">Doorbell</div>
          <Link 
            href="/options" 
            className="px-8 py-4 bg-[#0a0a0a] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a1a1a] transition-all duration-200 hover:shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-32 pb-24">
        <div className="max-w-[1200px] w-full">
          <div className="text-center max-w-[800px] mx-auto">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#0a0a0a] tracking-[-0.02em] leading-[1.1] mb-6">
              Know who's at your door, instantly
            </h1>
            <p className="text-[16px] text-[#4a4a4a] leading-[1.6] mb-12 max-w-[600px] mx-auto">
              Smart doorbell security with intelligent face recognition. Simple setup, instant alerts, and seamless monitoring.
            </p>
            <Link
              href="/options"
              className="inline-block px-8 py-4 bg-[#0a0a0a] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a1a1a] transition-all duration-200 hover:shadow-md"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[13px] font-medium text-[#999] uppercase tracking-wide mb-3">Features</p>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.02em]">
              Security made simple
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5] hover:shadow-sm transition-all duration-200">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Face Recognition</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Automatically detect and recognize visitors with advanced facial recognition technology
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5] hover:shadow-sm transition-all duration-200">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Instant Alerts</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Get real-time notifications when someone rings your doorbell, wherever you are
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5] hover:shadow-sm transition-all duration-200">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Secure Storage</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                All visitor data is securely stored and managed with privacy-first design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[13px] font-medium text-[#999] uppercase tracking-wide mb-3">How It Works</p>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.02em]">
              Simple three-step setup
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0a0a0a] text-white text-[24px] font-bold mb-6">
                1
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Access Dashboard</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Launch the system and choose between doorbell camera or monitoring dashboard
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0a0a0a] text-white text-[24px] font-bold mb-6">
                2
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Ring & Capture</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Press the ring button to capture and automatically process visitor images
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0a0a0a] text-white text-[24px] font-bold mb-6">
                3
              </div>
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Identify & Save</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                View visitors on your dashboard and save known faces for future recognition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5]">
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Real-time Updates</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Live dashboard with instant visitor notifications and status updates
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5]">
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Minimal Design</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Clean interface focused on what matters with intuitive navigation
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#e5e5e5]">
              <h3 className="text-[20px] font-semibold text-[#0a0a0a] mb-3">Smart Recognition</h3>
              <p className="text-[14px] text-[#4a4a4a] leading-[1.6]">
                Automatically identify known visitors and flag unknown ones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-8 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[48px] md:text-[56px] font-bold text-[#0a0a0a] tracking-[-0.02em] mb-6">
            Ready to secure your home?
          </h2>
          <p className="text-[16px] text-[#4a4a4a] leading-[1.6] mb-12">
            Get started with your smart doorbell system today
          </p>
          <Link
            href="/options"
            className="inline-block px-8 py-4 bg-[#0a0a0a] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1a1a1a] transition-all duration-200 hover:shadow-md"
          >
            Launch System
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] py-12 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[16px] font-semibold text-[#0a0a0a]">Doorbell</div>
          <div className="text-[14px] text-[#999]">
            Built with Next.js
          </div>
        </div>
      </footer>
    </div>
  );
}
