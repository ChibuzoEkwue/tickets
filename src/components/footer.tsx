import React from "react";

const Footer = () => {
  return (
    <footer className="container flex h-[80px] items-center justify-between text-sm">
      <p>
        Built by <span className="underline">Chibuzo Ekwue</span>
      </p>
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
