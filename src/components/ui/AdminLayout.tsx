import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DINELine2 from "../../assets/DINE-LINE-2.png";
import DINELine6 from "../../assets/DINE-LINE-6.png";
import image26 from "../../assets/image-26.png";
import vector from "../../assets/vector.svg";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 w-full h-[131px] shadow-lg z-50 bg-white">
      <div className="absolute top-0 left-0 w-full h-[61px] bg-[#004166]" />
      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        <div className="w-48" />
        <img
          className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] object-cover z-10"
          alt="Dine LINE"
          src={DINELine2}
        />
        <div className="absolute top-0 right-8 h-[61px] flex items-center gap-8">
          <button
            onClick={handleLogout}
            className="[font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl text-center whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            Cerrar sesión
          </button>
          <img
            className="w-8 h-8 cursor-pointer"
            alt="Vector Icon"
            src={vector}
          />
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full h-[489px] mt-20">
      <img
        className="absolute bottom-0 left-0 w-full h-[308px] object-cover"
        alt="Footer background"
        src={image26}
      />
      <img
        className="absolute top-[117px] left-1/2 -translate-x-1/2 w-[120px] h-[140px] object-cover"
        alt="Dine LINE"
        src={DINELine6}
      />
    </footer>
  );
};

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      <Footer />
    </>
  );
};
