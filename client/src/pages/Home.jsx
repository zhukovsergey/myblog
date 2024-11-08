import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Home = () => {
  return (
    <div className="flex justify-center items-start flex-col gap-4 p-6">
      <div className="flex flex-col lg:flex-row items-center gap-4 ">
        <LazyLoadImage
          effect="blur"
          src="https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary text-secondary">
            Get Started
          </button>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row items-center  gap-4">
        <LazyLoadImage
          effect="blur"
          src="https://avatars.mds.yandex.net/i?id=fc0e813c7aa52b349c80764409c97e3e_l-5288046-images-thumbs&n=13"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 ">
        <img
          src="https://avatars.mds.yandex.net/i?id=fc0e813c7aa52b349c80764409c97e3e_l-5288046-images-thumbs&n=13"
          className="max-w-sm rounded-lg shadow-2xl"
          loading="lazy"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
