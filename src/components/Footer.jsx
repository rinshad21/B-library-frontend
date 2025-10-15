import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-book-violet-400 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} made by rinshad💓. All rights reserved.
        </p>

        <a
          href="https://github.com/rinshad21"
          target="_blank"
          rel="noopener noreferrer"
          className=" flex items-center gap-2 mt-2 sm:mt-0 text-sm hover:underline hover:text-gray-200 transition-colors"
        >
          <FaGithub size={20} />
          <span>Visit my GitHub</span>
        </a>
      </div>
    </footer>
  );
};
