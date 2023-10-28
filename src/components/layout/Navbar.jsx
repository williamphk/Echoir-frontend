import React, { useState } from "react";

import SiteNameAndLogo from "./SiteNameAndLogo";
import NavButton from "./NavButton";
import ProfilePicSection from "./ProfilePicSection";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 shadow-md bg-white z-10">
      <nav className="px-4">
        <div className="grid grid-cols-3">
          <SiteNameAndLogo />
          <NavButton
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <ProfilePicSection />
        </div>
      </nav>
      {isMobileMenuOpen && <MobileMenu />}
    </header>
  );
};

export default Navbar;
