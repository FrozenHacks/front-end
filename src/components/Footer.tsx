import {
  FaSquareFacebook,
  FaInstagram,
  FaXTwitter,
  FaThreads,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigateToSocials = (e: React.MouseEvent, social: string) => {
    try {
      e.preventDefault();
      switch (social) {
        case "Facebook":
          console.log(social);
          break;
        case "Instagram":
          console.log(social);
          break;
        case "X":
          console.log(social);
          break;
        default:
          console.log(social);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-website-purple-dark sm:px-10 sm:py-12 lg:px-20 lg:py-16">
      <div className="flex flex-col w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 border-b border-white/40 pb-8">
          <div className="flex flex-col md:flex-row justify-between w-full">
            {/* SECTOR 1 */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <div className="bg-white h-8 w-8 rounded-full"></div>
                <p className="text-base font-normal text-website-offwhite sm:text-lg">
                  Event Booking
                </p>
              </button>
              <span className="text-xs font-light text-white sm:text-sm md:w-48 lg:w-64">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </span>
            </div>

            {/* SECTOR 2 */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <button className="text-xs font-light text-white sm:text-sm">
                Events
              </button>
              <button className="text-xs font-light text-white sm:text-sm">
                Bookings
              </button>
              <button
                onClick={() => navigate("/contact-us")}
                className="text-xs font-light text-white sm:text-sm"
              >
                Contact Us
              </button>
            </div>

            {/* SECTOR 3 */}
            <div className="flex flex-col gap-4 md:w-1/3 md:hidden">
              <button
                onClick={() => navigate("/terms-and-conditions")}
                className="text-xs font-light text-white sm:text-sm"
              >
                Terms and Conditions
              </button>
              <button
                onClick={() => navigate("/privacy-policy")}
                className="text-xs font-light text-white sm:text-sm"
              >
                Privacy Policy
              </button>
            </div>

            {/* SECTOR 4 */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <span className="text-xs font-light text-white sm:text-sm">
                Socials
              </span>
              <div className="flex gap-4">
                <button onClick={(e) => navigateToSocials(e, "Facebook")}>
                  <FaSquareFacebook className="text-white text-xl sm:text-2xl" />
                </button>
                <button onClick={(e) => navigateToSocials(e, "Instagram")}>
                  <FaInstagram className="text-white text-xl sm:text-2xl" />
                </button>
                <button onClick={(e) => navigateToSocials(e, "X")}>
                  <FaXTwitter className="text-white text-xl sm:text-2xl" />
                </button>
                <button onClick={(e) => navigateToSocials(e, "Threads")}>
                  <FaThreads className="text-white text-xl sm:text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-6">
          <span className="text-xs font-light text-white sm:text-sm">
            Copy right BS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
