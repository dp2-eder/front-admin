import React from "react";
import { useNavigate } from "react-router-dom";
import DINELine3 from "../assets/DINE-LINE.png";
import LockKeyhole from "../assets/lock-keyhole.svg";
import UserRound from "../assets/user-round.svg";

type InputFieldProps = {
  icon: string;
  type: string;
  placeholder: string;
};

const InputField = ({ icon, type, placeholder }: InputFieldProps) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-14 px-5 pr-12 py-3 text-xl bg-white rounded-[10px] border-[0.5px] border-solid border-[#ecf1f4] text-[#0E0E2C] placeholder-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
        <img src={icon} alt="" className="w-6 h-6 text-[#0E0E2C]" />
      </div>
    </div>
  );
};

export const DesktopInicioDe = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mocked
    navigate("/lista");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[linear-gradient(180deg,rgba(0,46,71,1)_38%,rgba(0,88,138,1)_75%,rgba(0,131,204,1)_100%)]">
      <div className="flex flex-col items-center w-full max-w-lg">
        <img
          className="w-[290px] h-[290px] object-cover"
          alt="Dine LINE"
          src={DINELine3}
        />

        <div className="my-12 [font-family:'Inter-ExtraLight_Italic',Helvetica] font-extralight italic text-white text-4xl text-center">
          “Sabores Auténticos”
          <br />
          “Momentos Inolvidables”
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <InputField icon={UserRound} type="text" placeholder="Usuario" />

          <InputField
            icon={LockKeyhole}
            type="password"
            placeholder="Contraseña"
          />

          <button
            type="submit"
            className="w-full h-[79px] bg-[#004166] text-[#FAFCFE] text-[32px] rounded-lg font-bold hover:opacity-90 transition-opacity shadow-xl"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
