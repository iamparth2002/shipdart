import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const ContactPage = () => {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-16">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input type="text" placeholder="Subject" />
                <Textarea placeholder="Your Message" />
                <Button type="submit">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Information</h2>
              <div className="space-y-2">
                <p><strong>Address:</strong> 123 Shipping Lane, Logistics City, 12345</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@shipdart.com</p>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ContactPage