import React from "react";

const Footer = () => {
  return (
    <footer className="text-center bg-gradient-to-r from-green-900 to-green-700 text-white p-4 rounded-lg">
      <p>Follow us on</p>
      <div className="flex justify-center gap-3 mt-2">
        {["instagram", "facebook", "twitter"].map((social) => (
          <a key={social} href="#"><img src={`/${social}.png} alt={social}`} className="w-8 h-8 hover:scale-110 transition"/></a>
        ))}
      </div>
      <p className="mt-2">© 2025 Krishi. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;