import { useRef } from "react";

//  COMPONENTS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Terms from "../components/TermsAndConditions/Terms";

const TermsAndConditions = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const termsAndConditions = useRef([
    {
      title: "User Agreement",
      terms: [
        "By using our website, you agree to comply with all applicable laws and regulations.",
        "You also confirm that you are at least 18 years of age or have the legal capacity to form a binding contract.",
        "Your use of our website signifies your acceptance of these terms. If you do not agree with any part of these terms, please do not use our services.",
      ],
    },
    {
      title: "Booking Process",
      terms: [
        "Our platform offers a straightforward process for booking events. You are required to provide accurate and up-to-date information during the booking process.",
        "We are not responsible for any issues arising from incorrect information provided by you.",
        "Upon successful booking, you will receive a confirmation email with all the details of your reservation. Please review this information carefully and contact us immediately if there are any discrepancies.",
      ],
    },
    {
      title: "Payment Terms",
      terms: [
        "Full payment must be made at the time of booking to secure your reservation.",
        "We accept various forms of payment, including credit cards and online payment gateways. All transactions are encrypted to ensure your financial information is secure.",
        "In the case of payment failures, please contact your bank or card issuer. We are not responsible for any payment issues beyond our control.",
        "Any promotional codes or discounts must be applied at the time of booking. They cannot be retroactively applied to existing reservations.",
      ],
    },
    {
      title: "Cancellation and Refund Policy",
      terms: [
        "In the event that you need to cancel your booking, please refer to our cancellation policy, which details the conditions under which a refund may be granted.",
        "Refunds are processed within a specific timeframe and may be subject to administrative fees.",
        "If you cancel within the allowed cancellation period, you will receive a full or partial refund based on our policy.Cancellations made outside this period may not be eligible for a refund.",
        "For events cancelled by the organizer, you will be notified promptly and offered options for rescheduling or a full refund.",
      ],
    },
    {
      title: "Event Changes and Cancellations by Organizers",
      terms: [
        "Occasionally, event organizers may need to alter or cancel an event due to unforeseen circumstances such as weather conditions, artist unavailability, or other emergencies.",
        "In such cases, we will notify you as soon as possible and provide options for rescheduling or refunds.",
        "We are not liable for any additional costs incurred by you due to such changes or cancellations, including travel or accommodation expenses.",
      ],
    },
    {
      title: "User Conduct",
      terms: [
        "You are expected to behave respectfully and responsibly while using our website and attending events.",
        "Any form of abusive, discriminatory, or inappropriate behavior will not be tolerated and may result in the termination of your account.",
        "You must not use our website for any unlawful purposes or in any way that could damage, disable, overburden, or impair it.",
      ],
    },
    {
      title: "Privacy Policy",
      terms: [
        "We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and safeguard your personal information.",
        "By using our services, you consent to our data practices as described in the policy.",
        "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law.",
      ],
    },
    {
      title: "Liability Limitation",
      terms: [
        "While we strive to provide accurate and timely information, we cannot guarantee the completeness or reliability of all content on our website.",
        "Therefore, we are not liable for any direct or indirect damages arising from the use of our services.",
        "This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.",
      ],
    },
    {
      title: "Changes to Terms and Conditions",
      terms: [
        "We reserve the right to update or modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of our website constitutes acceptance of the revised terms.",
        "It is your responsibility to review these terms periodically to stay informed of any updates.",
      ],
    },
    {
      title: "Contact Information",
      terms: [
        "If you have any questions or concerns regarding our terms and conditions, please feel free to contact our customer service team.",
        "We are here to assist you and ensure your experience with our Bukit website is positive.",
        "You can reach us via email, phone, or through our website's contact form. Our customer service hours are (insert hours of operation)",
      ],
    },
    {
      title: "Intellectual Property",
      terms: [
        "All content on our website, including text, graphics, logos, images, and software, is the property of our company or our content suppliers and is protected by intellectual property laws.",
        "You may not reproduce, distribute, or create derivative works from any content on our website without our express written permission.",
      ],
    },
    {
      title: "Governing Law",
      terms: [
        "These terms and conditions are governed by and construed in accordance with the laws of [insert jurisdiction].",
        "Any disputes arising from or relating to these terms will be subject to the exclusive jurisdiction of the courts of (insert jurisdiction).",
      ],
    },
    {
      title: "Indemnification",
      terms: [
        "You agree to indemnify, defend, and hold harmless our company, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from your use of our website or violation of these terms.",
      ],
    },
    {
      title: "Entire Agreement",
      terms: [
        "These terms and conditions constitute the entire agreement between you and our company regarding the use of our services.",
        "Any failure by us to enforce any provision of these terms shall not be construed as a waiver of any provision or right.",
        "Thank you for choosing our platform for your event booking needs. We hope you have an enjoyable and memorable experience at your selected events.",
      ],
    },
  ]);

  return (
    <div className="h-fit relative flex flex-col items-center w-screen overflow-y-scroll">
      <Navbar ModalRef={ref} />
      <div className="py-28 bg-website-purple bg-gradient-to-b from-website-purple to-website-purple-dark h-fit shrink-0 flex items-start w-full gap-5 px-40">
        <div className="opacity-40 absolute inset-0 z-10 bg-black"></div>
        <div className="h-fit z-20 flex flex-col w-full mt-4">
          <h2 className="text-2xl text-white">Terms and Conditions</h2>
          <p className="text-white/70 mt-4 text-sm font-light tracking-wide">
            Welcome to our Bukit Website. By accessing or using our services,
            you agree to adhere to the following terms and conditions. These
            terms outline your responsibilities and our obligations in providing
            a seamless experience for booking events. Please read them carefully
            to ensure a clear understanding of your rights and duties.
          </p>

          <div className="flex flex-col gap-10 mt-8">
            {termsAndConditions.current.map((obj, index) => {
              return <Terms key={index} data={obj} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
