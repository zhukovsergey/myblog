import { useState, useRef } from "react";
import ChangeTheme from "./ChangeTheme";
import { TiThMenuOutline } from "react-icons/ti";
import { useClickOutside } from "@reactuses/core";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircleOutline, IoMdLogIn } from "react-icons/io";
import LoginForm from "./login/LoginForm";
import { userAtom } from "../../recoil/atom/userAtom";
import { useRecoilState } from "recoil";
import logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { RiProfileLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const MainHeader = ({ theme, changeTheme }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const modalRef = useRef(null);

  const handleBlur = () => {
    console.log("Input blurred");
  };
  useClickOutside(modalRef, () => {
    setOpenMenu(false);
  });
  const navigateMenu = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(null);
        toast.success("Вы успешно вышли из системы");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-4 justify-between px-8 mx-2 mb-8 bg-base-200 rounded-lg p-4 shadow-md flex-wrap">
      <div className="flex items-center gap-4">
        <div>
          <TiThMenuOutline
            className="w-6 h-6 cursor-pointer hover:text-red-500 transition-all duration-300"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
        <AnimatePresence AnimatePresence mode="wait">
          {openMenu && (
            <motion.div
              initial={{ opacity: 0.8, x: -200, y: -100 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.4, ease: "linear" }}
              exit={{ opacity: 0.6, x: -200, y: -100 }}
              ref={modalRef}
              className={`absolute bg-base-100 h-dvh top-0 left-0 w-[300px] shadow-2xl px-4 py-4 z-10 ${
                theme === "cupcake" ? "bg-white" : "bg-black/80"
              }`}
            >
              <div
                onClick={() => setOpenMenu(false)}
                onBlur={handleBlur}
                className="absolute top-4 right-4"
              >
                <IoMdCloseCircleOutline className="w-6 h-6 cursor-pointer hover:text-red-500 hover:rounded-full transition-all duration-300" />
              </div>
              MENU
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center font-bold">
          <img
            src={logo}
            className="w-14 h-14 hover:scale-110 cursor-pointer transition-all duration-300"
          />
          <span>logo</span>
        </div>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Поиск" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="flex gap-4 items-center flex-wrap">
        <div>
          <ChangeTheme theme={theme} changeTheme={changeTheme} />
        </div>

        <div className="divider divider-horizontal" />
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-primary drop-shadow-md">
              <div className="dropdown dropdown-hover ">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full bg-red-500"
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div tabIndex={0} role="button" className=" m-1">
                    {user.name}
                  </div>
                </div>
                <ul
                  id="dropdownmenu"
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
                >
                  <li>
                    <Link onClick={navigateMenu} to={`/profile/${user.id}`}>
                      <RiProfileLine />
                      Профиль
                    </Link>
                  </li>
                  <li>
                    <span onClick={logoutHandler}>
                      {" "}
                      <CiLogout />
                      Выйти
                    </span>
                  </li>
                </ul>
              </div>
            </span>
          </div>
        ) : (
          <LoginForm />
        )}

        <button className="btn btn-secondary">Secondary</button>
      </div>
    </div>
  );
};

export default MainHeader;
