import { IoMoon, IoSunny } from "react-icons/io5";
import { motion } from "framer-motion";
const ChangeTheme = ({ theme, changeTheme }) => {
  return (
    <div>
      {theme === "cupcake" && (
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 20 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer w-[30px] h-[px] flex justify-center items-center"
        >
          <IoMoon className="text-2xl" onClick={changeTheme} />
        </motion.div>
      )}
      {theme === "dark" && (
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 20 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer w-[30px] h-[px] flex justify-center items-center"
        >
          <IoSunny className="text-2xl" onClick={changeTheme} />
        </motion.div>
      )}
    </div>
  );
};

export default ChangeTheme;
