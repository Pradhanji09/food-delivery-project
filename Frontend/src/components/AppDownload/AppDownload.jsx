import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="mx-auto mt-[100px] text-center text-[max(3vw,20px)] font-medium" id="app-download">
      <p>
        For better exprience download <br />
        Tomato App
      </p>
      <div className="flex justify-center gap-[max(2vw,10px)] mt-[40px]">
        <img
          className="w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05]"
          src={assets.app_store}
          alt="app store image "
        />
        <img
          className="w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05]"
          src={assets.play_store}
          alt="play store image"
        />
      </div>
    </div>
  );
};

export default AppDownload;
