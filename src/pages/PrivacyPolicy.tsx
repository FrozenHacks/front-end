import { useRef } from "react";

//  COMPONENT
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const PP = useRef([
    {
      title: "Personal Information",
      para: "When you interact with our website, we may collect personal identification information from you. This includes but is not limited to:",
      ul: [
        {
          title: "Name:",
          desc: "To identify and address you.",
        },
        {
          title: "Email Address:",
          desc: "To send booking confirmations, updates, and promotional offers.",
        },
        {
          title: "Phone Number:",
          desc: "For communication regarding your bookings.",
        },
        {
          title: "Payment Details:",
          desc: "To process transactions securely.",
        },
      ],
    },
    {
      title: "Non-Personal Identification Information",
      para: "We may also collect non-personal identification information about your interactions with our website. This includes:",
      ul: [
        {
          title: "Browser Information:",
          desc: "Type and version of the browser you are using.",
        },
        {
          title: "IP Address:",
          desc: "For security and analytical purposes.",
        },
        {
          title: "Cookies:",
          desc: "To enhance user experience and track website usage.",
        },
      ],
    },
  ]);

  const PP1 = useRef([
    {
      title: "How We Use the Information",
      para: "The information we collect is used for various purposes, including:",
      ul: [
        {
          title: "Processing Bookings:",
          desc: "To complete and manage your event bookings.",
        },
        {
          title: "Improving Customer Service:",
          desc: "To respond to your requests and support needs more efficiently.",
        },
        {
          title: "Sending Periodic Emails:",
          desc: "To inform you about your bookings, updates, and promotional offers. You can opt-out of these communications at any time.",
        },
        {
          title: "Personalizing User Experience:",
          desc: "To understand how our users as a group utilize the services and resources provided on our website.",
        },
        {
          title: "Analyzing Website Usage:",
          desc: "To improve our website layout, content, and functionality.",
        },
      ],
    },
    {
      title: "Security of Your Information",
      para: "We implement a variety of security measures to maintain the safety of your personal information. These measures include:",
      ul: [
        {
          title: "Encryption:",
          desc: "All sensitive information transmitted between your browser and our website is encrypted.",
        },
        {
          title: "Secure Servers:",
          desc: "Your personal information is stored on secure servers with restricted access.",
        },
        {
          title: "Regular Security Audits:",
          desc: "We conduct regular audits to ensure the security and integrity of our systems.",
        },
      ],
    },
  ]);

  return (
    <div className="h-fit relative flex flex-col items-center w-screen overflow-y-scroll">
      <Navbar ModalRef={ref} />
      <div className="py-28 bg-website-purple bg-gradient-to-b from-website-purple to-website-purple-dark h-fit shrink-0 flex items-start w-full gap-5 px-40">
        <div className="opacity-40 absolute inset-0 z-10 bg-black"></div>
        <div className="h-fit z-20 flex flex-col w-full mt-4">
          <h2 className="text-2xl text-white">Privacy Policy</h2>
          <p className="text-white/70 text-sm font-light tracking-wide">
            Welcome to our comprehensive Privacy Policy for our Bukit Website.
            Your privacy is of utmost importance to us, and we are committed to
            safeguarding your personal information. This policy outlines our
            practices regarding the collection, use, and protection of your
            data. By using our website, you consent to the practices described
            in this policy.
          </p>

          <h3 className="mt-14 mb-4 text-xl text-white">
            Information We Collect
          </h3>

          <div className="flex flex-col w-full gap-4">
            {PP.current.map((obj, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <h4 className="text-white/80 text-lg">{obj.title}</h4>
                  <p className="text-white/50 text-sm">{obj.para}</p>
                  {obj.ul.map((obj, index) => {
                    return (
                      <div key={index} className="flex items-center gap-1">
                        <p className="text-white/95 text-sm font-medium">
                          {obj.title}
                        </p>
                        <p className="text-white/50 text-sm">{obj.desc}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col w-full gap-4 mt-8">
            {PP1.current.map((obj, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <h3 className="mb-4 text-xl text-white">{obj.title}</h3>
                  <p className="text-white/50 text-sm">{obj.para}</p>
                  {obj.ul.map((obj, index) => {
                    return (
                      <div key={index} className="flex items-center gap-1">
                        <p className="text-white/95 text-sm font-medium">
                          {obj.title}
                        </p>
                        <p className="text-white/50 text-sm">{obj.desc}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <p className="text-white/50 mt-8 text-sm">
            However, please note that no method of electronic storage or
            transmission over the internet is 100% secure. While we strive to
            protect your personal information, we cannot guarantee its absolute
            security.
          </p>

          <div className="flex flex-col w-full mt-8">
            <h3 className="mb-4 text-xl text-white">
              Sharing Your Information
            </h3>
            <p className="text-white/50 text-sm">
              We do not sell, trade, or rent your personal identification
              information.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
