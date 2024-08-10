import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="bg-indigo-500 py-6">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="mb-3 text-center md:mb-0 md:text-left">
              <span className="font-bold uppercase tracking-widest text-gray-100">Newsletter</span>
              <p className="text-indigo-200">Subscribe to our newsletter</p>
            </div>

            <form className="flex w-full gap-2 md:max-w-md">
              <input
                placeholder="Email"
                className="w-full flex-1 rounded border border-white bg-indigo-400 px-3 py-2 text-white placeholder-indigo-100 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
              <button
                className="inline-block rounded bg-white px-8 py-2 text-center text-sm font-semibold text-indigo-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-indigo-600 md:text-base"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="pt-12 lg:pt-16">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
            <div className="col-span-full lg:col-span-2">
              {/* logo */}
              <div className="mb-4 lg:-mt-2">
                <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
                  <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-5 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                  </svg>
                  Flowrift
                </Link>
              </div>

              <p className="mb-6 text-gray-500 sm:pr-8">
                Filler text is dummy text which has no meaning however looks very similar to real text
              </p>

              {/* social */}
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                  <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                  <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>

                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                  <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.384c-.966 0-1.5-.667-1.5-1.5s.534-1.5 1.5-1.5 1.5.667 1.5 1.5-.534 1.5-1.5 1.5zm11.5 12.384h-3v-5.573c0-1.326-.024-3.045-1.845-3.045-1.846 0-2.129 1.44-2.129 2.924v5.694h-3v-11h2.873v1.504h.042c.4-.755 1.381-1.554 2.843-1.554 3.033 0 3.595 2.002 3.595 4.603v6.447z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-700">Company</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="hover:text-indigo-500">About</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Careers</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Press</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-700">Resources</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="hover:text-indigo-500">Blog</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Documentation</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Help Center</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">API</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-700">Legal</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="hover:text-indigo-500">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-indigo-500">Cookies Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-6">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <ul className="flex gap-4 text-center text-sm text-gray-500 md:text-left">
              <li>
                <Link to="/" className="hover:text-gray-700">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
