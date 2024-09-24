import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Star,
  ChevronRight,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headset,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const navItems = [
    { name: 'Transparent Pricing', icon: Truck },
    { name: 'Security for package', icon: ShieldCheck },
    { name: 'Customer service 24/7', icon: Headset },
  ];
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className=" mx-auto px-4 py-16 md:py-24 lg:py-16 lg:px-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Your <span className="text-primary">reliable,</span>
            <br />
            fast and quality
            <br />
            <span className="text-primary">courier service.</span>
          </h1>
          <p className="text-muted pr-16">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium veniam quia qui est in ullam, suscipit ad placeat molestias blanditiis, nam aliquid consequuntur! Recusandae consequatur libero eaque delectus necessitatibus dolore quos quia! Quidem excepturi
          </p>
          <Button className="rounded-full">Get Started</Button>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-muted rounded-full border-2 border-background"
                ></div>
              ))}
            </div>
            <span className="font-semibold">
              2500+ <span className="text-muted">Happy Customers</span>
            </span>
          </div>
        </div>
        <div className="md:w-1/2 w-full mt-8 md:mt-0 flex justify-end">
          <Image
            src="/delivery.jpeg"
            alt="Courier"
            width={500}
            height={500}
            className="rounded-lg w-full"

          />
        </div>
      </section>

      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-2 lg:text-5xl">
          Why should you use
          <br />
          our services?
        </h2>
        <p className="text-muted text-center mb-12">
          Why you have to use our services because you will get a very <br />
          satisfying service and your goods are guranteed safe
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {navItems.map((title, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg space-y-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0
                    ? 'bg-blue-500'
                    : index === 1
                    ? 'bg-red-500'
                    : 'bg-green-500'
                }`}
              >
                <title.icon className="w-6 h-6" color="white" />
              </div>
              <h3 className="text-xl font-semibold">{title.name}</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsam repellat incidunt, maxime blanditiis asperiores quo. Maxime tempora error minima obcaecati! Aperiam, architecto! Modi nostrum praesentium minus laudantium itaque quisquam!
              </p>
              <a href="#" className="text-primary flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Shipdart Delivery Service */}
      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16 flex flex-col md:flex-row items-center ">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image
            src="https://images.pexels.com/photos/4604668/pexels-photo-4604668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Delivery"
            width={500}
            height={300}
            className="rounded-lg w-full h-[500px] object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-12 space-y-6">
          <h2 className="text-3xl font-bold lg:text-5xl">
            Shipdart Delivery service
            <br />
            at your doorstep.
          </h2>
          <p className="text-muted text-balance">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt possimus nulla! Aliquid hic deserunt quae, unde odit aperiam doloremque nobis eaque ab quasi natus, quia praesentium tenetur ad quis perspiciatis iusto! Recusandae beatae quod expedita delectus amet sequi, aliquam, repellat quia eum molestiae saepe?Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dolor earum, quas vero quo vel nisi quasi saepe repudiandae inventore. Vel ad temporibus minima ullam ducimus quo laborum eos dolore.
          </p>
          <Button className="text-white rounded-full">
            Learn More
          </Button>
        </div>
      </section>

      {/* Our Delivery Process */}
      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16 bg-gray-100">
        <div className="flex flex-col md:flex-row md:items-center ">
          <div className="md:w-1/2 space-y-6 mb-8 md:mb-0 md:pr-20">
          <p className="text-sm text-green-400">How it Works ?</p>
            <h2 className="text-3xl font-bold lg:text-5xl">Our Delivery Process</h2>
            <p className="text-muted">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque est adipisci sed magnam excepturi odio assumenda, sit dignissimos voluptates error.
            </p>
            {['Booking', 'Packing', 'Transportation', 'Delivery'].map(
              (step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-white ${
                      [
                        'bg-blue-500',
                        'bg-pink-500',
                        'bg-yellow-500',
                        'bg-green-500',
                      ][index]
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step}</h3>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellat asperiores modi nemo fuga? Nobis libero qui vitae?
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="https://images.pexels.com/photos/4393532/pexels-photo-4393532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Delivery Process"
              width={500}
              height={500}
              className="rounded-lg w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 lg:text-5xl">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Parcel Delivery', 'Logistic Service', 'Warehouse'].map(
            (service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg overflow-hidden"
              >
                <Image
                  src="https://images.pexels.com/photos/4392876/pexels-photo-4392876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt={service}
                  width={400}
                  height={200}
                  className="w-full"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{service}</h3>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur at nostrum deserunt dolor excepturi, eligendi corrupti, saepe sit dolorem deleniti omnis iste? Expedita iusto labore dignissimos aliquam adipisci eum.
                  </p>
                  <a href="#" className="text-primary flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Global Shipping Solutions */}
      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16">
        <h2 className="text-3xl font-bold mb-8">Global Shipping Solutions</h2>
        <div className="bg-secondary p-6 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-muted mb-2">Shipping from</label>
              <input type="text" className="w-full bg-background p-2 rounded" placeholder="City or Country" />
            </div>
            <div>
              <label className="block text-muted mb-2">Shipping to</label>
              <input type="text" className="w-full bg-background p-2 rounded" placeholder="City or Country" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-muted mb-2">Weight</label>
              <input type="text" className="w-full bg-background p-2 rounded" placeholder="0.5 kg" />
            </div>
            <div>
              <label className="block text-muted mb-2">Height</label>
              <input type="text" className="w-full bg-background p-2 rounded" placeholder="10 cm" />
            </div>
            <div>
              <label className="block text-muted mb-2">Width</label>
              <input type="text" className="w-full bg-background p-2 rounded" placeholder="10 cm" />
            </div>
          </div>
          <button className=" text-white bg-primary text-foreground px-6 py-2 rounded-full font-semibold">Calculate</button>
        </div>
      </section>

      {/* Client's Say About Us */}
      <section className=" mx-auto px-4 py-16 lg:py-24 lg:px-16">
        <p className='text-primary text-sm text-center mb-2'>What people say about us?</p>
        <h2 className="text-3xl font-bold text-center mb-2">
          Client's Say About Us
        </h2>
        <p className="text-muted w-full text-center mb-12">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem fugit, tempora ut voluptates dolores qui sed molestias animi ipsa facere.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                  alt="Client"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-muted">Customer</p>
                </div>
              </div>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className=" mx-auto px-4 py-4 lg:py-8 lg:px-16">
        <div className="bg-accent rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe our newsletter</h2>
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          {/* <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-2 rounded-l-full"
            />
            <button className="bg-background text-foreground px-6 py-2 rounded-r-full bg-black text-white">
              Subscribe
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
}
