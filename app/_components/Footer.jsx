"use client";

import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-500 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* About Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">AI Education</h3>
            <p className="mt-2 text-sm text-gray-200 max-w-md">
              Empowering learners to create and share AI courses with innovative tools.
            </p>
          </div>

          {/* Contact Info & Social Media */}
          <div className="text-center">
            <p className="text-sm text-gray-200">
              Contact: <a href="mailto:vaibhav10.ssm@gmail.com" className="hover:underline">vaibhav10.ssm@gmail.com</a>
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <a href="https://twitter.com" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.285-2.332 1.818-3.337z" />
                </svg>
              </a>
              <a href="https://facebook.com" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} AI Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;