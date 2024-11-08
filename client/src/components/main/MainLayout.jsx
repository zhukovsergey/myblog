import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeAtom } from "../../recoil/atom/themeAtom";

import MainHeader from "./MainHeader";
import Footer from "./Footer";

const MainLayout = () => {
  const [theme, setTheme] = useRecoilState(themeAtom || "cupcake");

  const changeTheme = () => {
    setTheme(theme === "cupcake" ? "dark" : "cupcake");
  };
  return (
    <div
      data-theme={theme}
      className={
        theme === "dark"
          ? ""
          : "bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] "
      }
    >
      <MainHeader theme={theme} changeTheme={changeTheme} />

      <div className="flex-1 flex bg-muted/40 p-8 md:px-28 md:py-4  ">
        <div
          className={
            theme === "cupcake"
              ? "bg-white w-full p-4 rounded-lg shadow-lg"
              : "rounded-lg w-full p-4 shadow-md bg-black/30 "
          }
        >
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
