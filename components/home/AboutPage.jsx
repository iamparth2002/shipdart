import React from 'react'

const AboutPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-16">
          <h1 className="text-4xl font-bold mb-8">About ShipDart</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our History</h2>
              <p>ShipDart was founded in 2010 with a mission to revolutionize the shipping industry. We've grown from a small startup to a leading player in the market, always putting our customers first.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>At ShipDart, we strive to provide the fastest, most reliable, and cost-effective shipping solutions for businesses and individuals alike. Our goal is to make shipping as easy and stress-free as possible.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p>We have a dedicated team of professionals with years of experience in logistics, customer service, and technology. Together, we work tirelessly to ensure that your packages are delivered on time, every time.</p>
            </section>
          </div>
        </div>
      )
}

export default AboutPage