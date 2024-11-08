import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/main/MainLayout";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import { useRecoilState } from "recoil";
import { userAtom } from "./recoil/atom/userAtom";

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}

export default App;
