'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import HomePage from '@/components/home/HomePage';
import AboutPage from '@/components/home/AboutPage';
import ContactPage from '@/components/home/ContactPage';
import RaiseTicketPage from '@/components/home/RaiseTicketPage';
import FAQPage from '@/components/home/FAQPage';
import TermsPage from '@/components/home/TermsPage';
import PrivacyPage from '@/components/home/PrivacyPage';
import Link from 'next/link';

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'raise-ticket':
        return <RaiseTicketPage />;
      case 'faq':
        return <FAQPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage />;
    }
  };

  const NavItems = ({ setPage, closeSheet }) => (
    <ul className="flex max-md:flex-col flex-row gap-4 max-md:space-y-4 ">
      <li>
        <button
          onClick={() => {
            setPage('home');
            closeSheet();
          }}
          className="hover:underline"
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setPage('about');
            closeSheet();
          }}
          className="hover:underline"
        >
          About
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setPage('contact');
            closeSheet();
          }}
          className="hover:underline"
        >
          Contact
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setPage('raise-ticket');
            closeSheet();
          }}
          className="hover:underline"
        >
          Raise Ticket
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setPage('faq');
            closeSheet();
          }}
          className="hover:underline"
        >
          FAQ
        </button>
      </li>
      {/* <li><button onClick={() => { setPage('terms'); closeSheet(); }} className="hover:underline">T&C</button></li>
      <li><button onClick={() => { setPage('privacy'); closeSheet(); }} className="hover:underline">Policy</button></li> */}
    </ul>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold"
          >
            ShipDart
          </button>
          <nav className="hidden md:block">
            <NavItems
              setPage={setCurrentPage}
              closeSheet={() => document.body.click()}
            />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" color="black" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col h-full py-6">
                <h2 className="text-lg font-semibold mb-8">Menu</h2>
                <NavItems
                  setPage={setCurrentPage}
                  closeSheet={() => document.body.click()}
                />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex space-x-2">
            <Link href="/login">
              <Button variant="primary">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="" variant="secondary">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">{renderPage()}</main>
      <footer className="bg-primary text-primary-foreground py-4 ">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 ShipDart. All rights reserved.</p>
          <div className="mt-2">
            <button
              onClick={() => setCurrentPage('terms')}
              className="hover:underline mr-4"
            >
              Terms and Conditions
            </button>
            <button
              onClick={() => setCurrentPage('privacy')}
              className="hover:underline"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
