import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function FooterPage() {
  return (
    <div className="flex flex-col max-h-screen">
      <footer className="w-full flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white mt-auto">
        <div className="container px-6 pt-6">
          <div className="mb-6 flex justify-center space-x-2">
            <a
              href="#!"
              className="rounded-full bg-[#3b5998] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="#!"
              className="rounded-full bg-[#55acee] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="#!"
              className="rounded-full bg-[#dd4b39] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaGoogle className="h-5 w-5" />
            </a>
            <a
              href="#!"
              className="rounded-full bg-[#ac2bac] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="#!"
              className="rounded-full bg-[#0082ca] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="#!"
              className="rounded-full bg-[#333333] p-3 text-white shadow-lg transition duration-150 ease-in-out hover:shadow-md"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          © 2024 Copyright: mohamad yaghma
        </div>
      </footer>
    </div>
  );
}
