import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formData
      );
      if (res.data.success) {
        toast.success("Регистрация прошла успешно");
        document.getElementById("my_modal_3").close();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Произошла ошибка при регистрации: " + error.response.data.message
      );
    }
  };
  return (
    <div>
      <button
        className="btn btn-accent "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Регистрация
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg ">Форма регистрации</h3>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Введите Ваше имя</span>
            </div>
            <div className="relative">
              <input
                autoComplete="on"
                type="text"
                name="name"
                required
                placeholder="Имя*"
                className="input input-bordered w-full max-w-xs pl-8"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 " />
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Введите Вашу электронную почту</span>
            </div>
            <div className="relative">
              <input
                autoComplete="on"
                type="email"
                name="email"
                required
                placeholder="email*"
                className="input input-bordered w-full max-w-xs pl-8 dark:text-white"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 " />
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Пароль</span>
            </div>
            <div className="relative">
              <input
                autoComplete="on"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Пароль*"
                className="input input-bordered w-full max-w-xs px-8 text-black"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <RiLockPasswordLine className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 " />
              {showPassword ? (
                <FaRegEye
                  onClick={() => setShowPassword(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 cursor-pointer"
                />
              )}
            </div>
          </label>
          <button onClick={handleRegister} className="btn btn-primary mt-4 ">
            Зарегистрироваться
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RegisterForm;
