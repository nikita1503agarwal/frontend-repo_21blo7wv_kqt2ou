import React from 'react'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <section id="next-section" className="py-20">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl">
            We deliver end-to-end design–build solutions for corporate interiors, base builds, and complex renovations. Explore our case studies and process below.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App