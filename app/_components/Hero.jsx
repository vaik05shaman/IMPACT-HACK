"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";
import { useUser } from "@clerk/nextjs";

function Hero() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="bg-white py-32 text-center text-gray-600">Loading...</div>;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          {/* Personalized Welcome Message */}
          {isSignedIn && (
            <p className="text-xl font-semibold text-blue-600 animate-fade-in-up">
              Welcome, {user?.firstName || "User"}!
            </p>
          )}

          {/* Main Heading with Animation */}
          <h1 className="text-4xl font-extrabold sm:text-6xl text-blue-600 animate-fade-in-up mt-4">
            AI Course Generator
            <strong className="block font-extrabold text-black mt-2">
              Craft Your Learning Journey
            </strong>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Build custom AI courses tailored to your goals. Share your creations, inspire others, and earn by teaching what you love.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <Link href="/dashboard">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                {isSignedIn ? "Your Dashboard" : "Get Started"}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 border border-blue-600 hover:bg-gray-100 px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Motivational Quote */}
          <div className="mt-12 max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-gray-600 border-l-4 border-blue-600 pl-4 animate-fade-in-up delay-300">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." — Brian Herbert
            </blockquote>
          </div>

          {/* Enhanced Stats Section with Icons */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="animate-fade-in-up delay-400">
              <svg className="w-8 h-8 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              <h3 className="text-2xl font-bold text-black">10,00+</h3>
              <p className="text-gray-600">Courses Created</p>
            </div>
            <div className="animate-fade-in-up delay-500">
              <svg className="w-8 h-8 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              <h3 className="text-2xl font-bold text-black">50,00+</h3>
              <p className="text-gray-600">Active Learners</p>
            </div>
            <div className="animate-fade-in-up delay-600">
              <svg className="w-8 h-8 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
              <h3 className="text-2xl font-bold text-black">100+</h3>
              <p className="text-gray-600">Topics Covered</p>
            </div>
          </div>

          {/* Mock Testimonial Carousel */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-black animate-fade-in-up delay-700">
              What Our Learners Say
            </h2>
            <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-center">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm animate-fade-in-up delay-800">
                <p className="text-gray-600">
                  "The AI Course Generator helped me create a course in minutes. Sharing it with my community was a game-changer!"
                </p>
                <p className="mt-4 font-semibold text-black">— Jane D., Educator</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm animate-fade-in-up delay-900">
                <p className="text-gray-600">
                  "I learned AI concepts at my own pace and earned by teaching others. Highly recommend!"
                </p>
                <p className="mt-4 font-semibold text-black">— Mark S., Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-900 {
          animation-delay: 0.9s;
        }
      `}</style>
    </section>
  );
}

export default Hero;