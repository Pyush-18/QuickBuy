'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/sign-up', label: 'Sign Up' },
    { href: '/sign-in', label: 'Sign In' },
    { href: '/cart', label: 'Cart' },
  ];

  return (
    <nav className="backdrop-blur-lg text-white shadow-lg fixed top-0 left-0 w-full h-[60px] z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition duration-200">
          QuickBuy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-blue-400 transition duration-200 ${
                pathname === link.href ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label === 'Cart' ? (
                <span className="flex items-center">
                  <FaShoppingCart className="mr-1" /> {link.label}
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={`text-sm font-medium hover:text-blue-400 transition duration-200 ${
                  pathname === link.href ? 'text-blue-400 border-l-4 border-blue-400 pl-2' : 'text-gray-300'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label === 'Cart' ? (
                  <span className="flex items-center">
                    <FaShoppingCart className="mr-2" /> {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}