//  COMPONENTS
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdLocationPin } from "react-icons/md";

const GetInTouch = () => {
  return (
    <div className="relative flex flex-col w-screen h-[50vh] gap-20 px-4 py-8 sm:py-10 sm:h-screen sm:px-40 bg-website-purple bg-gradient-to-b from-website-purple-dark to-website-purple">
      <img
        src="/telephone.png"
        alt="tele"
        className="absolute top-0 left-0 object-cover w-full h-full bg-center"
      />
      <div className="z-30 flex flex-col items-center w-full h-full text-white">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xs tracking-wide sm:text-5xl">
            Get in touch with us!!
          </h2>
          <h4 className="text-[8px] font-light tracking-wide sm:text-lg">
            For any further queries, drop in a mail or a call and we will get
            back to you
          </h4>
        </div>

        <div className="flex gap-8 mt-4 w-fit sm:gap-60 sm:mt-36">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaPhone className="max-sm:w-[7.5px] max-sm:h-[7.5px]" />
            <p className="text-[8px] sm:text-sm font-light">+91 - 9999999999</p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <MdEmail className="max-sm:w-[7.5px] max-sm:h-[7.5px]" />
            <p className="text-[8px] sm:text-sm font-light">abc@email.com</p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <MdLocationPin className="max-sm:w-[7.5px] max-sm:h-[7.5px]" />
            <p className="text-[8px] sm:text-sm font-light">Chennai, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
