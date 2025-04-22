import Link from "next/link";
import React from 'react'
import { Button } from '../../components/ui/button'

function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-400">
        AI COURSE GENERATER
        <strong className="font-extrabold text-black sm:block"> Custom Learning </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Create your own AI course with the help of our AI course generator. Share it with friends and earn
        from it.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href={'/dashboard'}>
         <Button className='p-5 cursor-pointer'>Get Started</Button>
         
        </Link>

       
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero