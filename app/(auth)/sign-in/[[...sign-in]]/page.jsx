"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section: Image with Overlay */}
        <section className="relative flex h-32 items-end bg-black lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            src="/sign.jpg"
            width={1000}
            height={1000}
            alt="AI Course Generator"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12 animate-fade-in-up">
            <Link href="/" className="block text-white">
              <span className="sr-only">Home</span>
              <Image src="/logo.png" width={50} height={30} alt="AI Course Generator Logo" />
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to AI Course Generator
            </h2>

            <p className="mt-4 leading-relaxed text-white/90 max-w-md">
              Create custom AI courses with ease, share them with your community, and earn by teaching what you love.
            </p>

            <blockquote className="mt-6 text-sm italic text-white/90 border-l-4 border-blue-600 pl-4">
              "The beautiful thing about learning is that nobody can take it away from you." — B.B. King
            </blockquote>
          </div>
        </section>

        {/* Right Section: SignIn Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden animate-fade-in-up delay-100">
              <Link
                href="/"
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
              >
                <span className="sr-only">Home</span>
                <Image src="/logo.png" width={40} height={24} alt="AI Course Generator Logo" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                Welcome to AI Course Generator
              </h1>

              <p className="mt-4 leading-relaxed text-gray-600">
                Sign in to start creating and sharing your AI courses today.
              </p>
            </div>

            {/* SignIn Component */}
            <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in-up delay-200">
              <SignIn afterSignInUrl="/dashboard" />
            </div>

            {/* Additional Content */}
            <div className="mt-8 text-center animate-fade-in-up delay-300">
              <p className="text-gray-600">
                New to AI Course Generator?{" "}
                <Link href="/sign-up" className="text-blue-600 hover:underline">
                  Create an account
                </Link>{" "}
                to join our community of learners and creators.
              </p>
            </div>
          </div>
        </main>
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
      `}</style>
    </section>
  );
}