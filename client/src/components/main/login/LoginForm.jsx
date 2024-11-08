import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../recoil/atom/userAtom";

const LoginForm = () => {
  const [formData, setFormData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Вы успешно вошли на сайт");
        document.getElementById("my_modal_2").close();
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при входе: " + error.response.data.message);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Войти
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Форма входа на сайт</h3>
          {/* Форма логина */}
          <form>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  Введите Вашу электронную почту
                </span>
              </div>
              <div className="relative">
                <input
                  autoComplete="on"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="email*"
                  className="input input-bordered w-full max-w-xs pl-8"
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
                  id="password"
                  required
                  placeholder="Пароль*"
                  className="input input-bordered w-full max-w-xs px-8"
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
            <button onClick={handleLogin} className="btn btn-primary mt-4 ">
              Войти
            </button>
          </form>
          <div className="divider">Если нет аккаунта</div>
          <div
            className="mt-2 flex justify-start items-center gap-4"
            onClick={() => document.getElementById("my_modal_2").close()}
          >
            У вас еще нет аккаунта?{" "}
            <span className="text-amber-700 underline underline-offset-2 ">
              <RegisterForm />
            </span>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default LoginForm;
