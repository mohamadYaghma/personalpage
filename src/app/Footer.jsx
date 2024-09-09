import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function FooterPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        {/* محتوای صفحه اینجا قرار می‌گیرد */}
      </div>
      
      <footer
        className="relative left-0 w-full flex flex-col items-center bg-zinc-50
         text-center text-surface dark:bg-neutral-700
          dark:text-white mt-auto"
      >
        <div className="container px-6 pt-6">
          <div className="mb-6 flex justify-center space-x-2">
            <a
              href="#!"
              className="rounded-full bg-[#3b5998] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>

            <a
              href="#!"
              className="rounded-full bg-[#55acee] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaTwitter className="h-5 w-5" />
            </a>

            <a
              href="#!"
              className="rounded-full bg-[#dd4b39] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaGoogle className="h-5 w-5" />
            </a>

            <a
              href="#!"
              className="rounded-full bg-[#ac2bac] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaInstagram className="h-5 w-5" />
            </a>

            <a
              href="#!"
              className="rounded-full bg-[#0082ca] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>

            <a
              href="#!"
              className="rounded-full bg-[#333333] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          © 2023 Copyright: mohamad yaghma
        </div>
      </footer>
    </div>
  );
}
