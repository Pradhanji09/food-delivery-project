import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] p-[20px] px-[8vw] pt-[80px] mt-[100px]"
      id="footer"
    >
      <div className="w-full footer-content grid grid-cols-[2fr_1fr_1fr] gap-[80px]">
        <div className="flex flex-col items-start gap-[20px]">
          <img src={assets.logo} alt="footer logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            perferendis facere, laborum explicabo officiis neque quas, veritatis
            molestias aliquam aperiam odit, assumenda ipsa voluptate enim
            officia! Dicta impedit sed dolorem.
          </p>
          <div className="flex gap-5 footer-social-icon ">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <img src={assets.twitter_icon} alt="facebook icon" />
            <img src={assets.linkedin_icon} alt="facebook icon" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-[20px]">
          <p className="white font-bold text-2xl">COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-[20px]">
          <p className="white font-bold text-2xl">GET IN TOUCH</p>
          <ul>
            <li>+91-2255885500</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] my-[20px]" />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
