import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DINELine3 from "../assets/DINE-LINE.png";
import LockKeyhole from "../assets/lock-keyhole.svg";
import UserRound from "../assets/user-round.svg";

type InputFieldProps = {
  icon: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

const InputField = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  name,
}: InputFieldProps) => {
  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-14 px-5 pr-12 py-3 text-xl bg-white rounded-[10px] border-[0.5px] border-solid border-[#ecf1f4] text-[#0E0E2C] placeholder-[#0E0E2C] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
        <img src={icon} alt="" className="w-6 h-6 text-[#0E0E2C]" />
      </div>
    </div>
  );
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { loginUser } = await import("../services/authService");
      const response = await loginUser(formData);
      login(response.access_token);

      navigate("/admin/lista");
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center animate-pulse">
              {error}
            </div>
          )}

          <InputField
            icon={UserRound}
            type="text"
            placeholder="Usuario o Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            icon={LockKeyhole}
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[79px] bg-[#004166] text-[#FAFCFE] text-[32px] rounded-lg font-bold shadow-xl transition-all
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 hover:scale-[1.01]"}`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};
