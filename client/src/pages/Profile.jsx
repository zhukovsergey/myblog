import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";
import { useEffect, useState } from "react";
import axios from "axios";
import { PiImage } from "react-icons/pi";

const Profile = () => {
  const params = useParams();
  const [userFromLocal, setUserFromLocal] = useRecoilState(userAtom);
  const [userFromDatabase, setUserFromDatabase] = useState({});
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  console.log(params);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${params.id}`
        );

        if (res.data.success) {
          setUserFromDatabase(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [params.id]);
  const handleDeleteFile = (e) => {
    e.preventDefault();
    setFile(null);
    setFilePreview(null);
  };
  return (
    <div className="h-screen">
      <h2 className="text-center">
        Профиль пользователя{" "}
        <span className="text-primary font-semibold">
          {userFromDatabase.name}
        </span>
      </h2>
      {userFromDatabase?._id === userFromLocal?.id ? (
        <div className="my-8">
          <label htmlFor="file" className="cursor-pointer text-center">
            <div className="flex flex-col items-center">
              {filePreview ? (
                <div className="relative">
                  <span
                    className="rounded-full absolute top-1 right-2 text-white border-2  w-6 h-6 flex justify-center items-center hover:scale-105 hover:bg-red-500 transition-all duration:300"
                    onClick={handleDeleteFile}
                  >
                    X
                  </span>
                  <img
                    src={filePreview}
                    className="object-cover w-[350px]"
                    alt="preview"
                  />
                </div>
              ) : (
                <div>
                  <PiImage className="w-32 h-32 mx-auto" />
                  <span className="text-xs -mt-4">Выберите файл</span>
                </div>
              )}
            </div>
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFilePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <div className="flex flex-col my-2">
            <label className="label-text ml-4">Имя пользователя</label>
            <input
              type="text"
              placeholder="Имя пользователя"
              className="input input-bordered w-full max-w-xs"
              defaultValue={userFromDatabase.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="label-text ml-4">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              defaultValue={userFromDatabase.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          {userFromDatabase.avatar ? (
            <img src={userFromDatabase.avatar} alt="avatar" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <PiImage className="w-32 h-32 mx-auto" />
              <span>Фото профиля пока не загружено пользователем</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
