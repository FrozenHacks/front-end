/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

//  COMPONENTS
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { TEvent } from "../../types/Slices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserCard {
  name: string;
  email: string;
  phone: string;
}

const EventBookCard = () => {
  const MAX_TICKETS = 10;
  const navigate = useNavigate();
  // selectedEvent = useSelector(
  //   (state: RootState) => state.EventSlice.value.selectedEvent
  // );
  const event = sessionStorage.getItem('event') ?? ''
  // const selectedEvent: TEvent = JSON.parse(event)
  const [selectEvent, setSelectEvent] = useState<TEvent>();

  useEffect(() => {
    const event = sessionStorage.getItem('event') ?? ''
    setSelectEvent(JSON.parse(event))
  },[])

  const selectedEvent = selectEvent ?? (JSON.parse(event) as TEvent)
  let userDetails: any = {};
const user = sessionStorage.getItem('userDetails') ?? '';
if (user) {
  userDetails = JSON.parse(user);
}

// Example usage of userDetails
console.log(userDetails);

  const [selectedPasses, setSelectedPasses] = useState(
    selectedEvent.pricing.map((pass) => ({ ...pass, quantity: 0 }))
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [buyOthers, setBuyOthers] = useState(false)
  const [selectedPass, setSelectedPass] = useState<any>({});
  // State to store the list of user cards
  const [userCards, setUserCards] = useState<UserCard[]>([]);

  // State to track the new user input
  const [newUser, setNewUser] = useState<UserCard>({
    name: "",
    email: "",
    phone: "",
  });

  // Handler to add a new user card
  const addUserCard = () => {
    setUserCards([...userCards, newUser]);
    setNewUser({ name: "", email: "", phone: "" }); // Clear the input fields
  };

  // Handler to remove a user card by index
  const removeUserCard = (index: number) => {
    setUserCards(userCards.filter((_, i) => i !== index));
    updateQuantity(selectedPass._id, -1);
  };

  // Handler to update the input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateQuantity(selectedPass._id, 1);
    // Add your save logic here
    addUserCard();
    setModalOpen(false); // Close the modal after saving
  };

  const handleCancel = () => {
    setModalOpen(false); // Close the modal without saving
  };

  const payNowSubmit = async () => {
    const token = sessionStorage.getItem("token");
    try {
      let response: any
      if(buyOthers){
        const data = {
          "users": userCards.map((user) => {
            return {
              "fullName": user.name,
              "email": user.email,
              "phone": Number(user.phone),
              "scheme": selectedPass.title
            }
          }),
          "event": selectedEvent._id,
          "mode": "HITPAY",
          "currency": "SGD"
        }
  
        response = await axios.post(
          `http://localhost:4500/api/v1/transactions/event/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const data = {
          "pricing": [
            {
              "name": selectedPass.title,
              "count": totalQuantity
            }
          ],
          "event": selectedEvent._id,
          "mode": "HITPAY",
          "currency": "SGD"
        }
  
        response = await axios.post(
          `http://localhost:4500/api/v1/transactions/traditional-txn/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

      }

      const { message, paymentURL } = response.data;

      if (message && paymentURL) {
        // Open new window with the payment URL
        const width = 800;
        const height = 600;

        // Calculate center position
        const left = (window.innerWidth - width) / 2 + window.screenX;
        const top = (window.innerHeight - height) / 2 + window.screenY;

        // Open new window with the payment URL
        const paymentWindow = window.open(paymentURL, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

        if (paymentWindow) {
          const checkWindowClosed = setInterval(() => {
            if (paymentWindow.closed) {
              clearInterval(checkWindowClosed);
              console.log('Payment window closed.');
              // navigate('/'); // Navigate to homepage
            }
          }, 1000);

          // Optionally, you could add logic to monitor the payment process and close the window
          // For example, use `paymentWindow.onload` or `paymentWindow.addEventListener('beforeunload', ...)`
          paymentWindow.addEventListener('unload', () => {
            // Perform any cleanup or state updates here if necessary
            console.log('Payment window closed.');
            // navigate('/')
            setInterval(() => {
                navigate('/'); // Navigate to homepage
            }, 60000);
          });
        } else {
          console.error('Failed to open payment window.');
        }
      } else {
        console.error('Invalid response from API.');
      }
      setUserCards([])
      setSelectedPasses(    selectedEvent.pricing.map((pass) => ({ ...pass, quantity: 0 }))
      )
    } catch (error) {
      
    }

  }

  const handleSelectedPass = (pass: any) => {
    if(pass.title !== selectedPass.title){
      setUserCards([])
      setSelectedPasses(    selectedEvent.pricing.map((pass) => ({ ...pass, quantity: 0 }))
      )
    }
  }

  //   @ts-expect-error
  const updateQuantity = (id, delta) => {
    setSelectedPasses((prev) => {
      const newPasses = prev.map((pass) =>
        pass._id.toString() === id.toString()
          ? {
              ...pass,
              quantity: Math.min(MAX_TICKETS, Math.max(0, pass.quantity + delta)),
            }
          : {
              ...pass,
              quantity: 0, // Reset the quantity of all other passes
            }
      );
  
      // Ensure that at least one pass has a non-zero quantity
      const totalQuantity = newPasses.reduce(
        (acc, pass) => acc + pass.quantity,
        0
      );
      setTotalQuantity(totalQuantity)
      // if (totalQuantity === 0) {
      //   // No passes selected, so do not reset the quantities
      //   return prev;
      // }
  
      return newPasses;
    });
  };
  

  const calculateTotal = () => {
    return selectedPasses.reduce((total, pass) => {
      return total + pass.amount * pass.quantity;
    }, 0);
  };

  //   const notes = useRef([
  //     "Lorem ipsum dolor sit.",
  //     "Lorem ipsum dolor sit amet.",
  //     "Lorem ipsum dolor sit amet consectetur.",
  //     "Lorem, ipsum.",
  //     "Lorem ipsum dolor sit amet consectetur.",
  //   ]);

  const starCalc = (() => {
    const whole = Math.floor(parseInt(selectedEvent.rating.$numberDecimal));
    const half = parseInt(selectedEvent.rating.$numberDecimal) - whole !== 0;
    const empty = 5 - whole - (half ? 1 : 0);
    return { complete: whole, half, empty };
  })();

  const showOnMap = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      // TBD
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleButtonClick = () => {
    setBuyOthers(!buyOthers); // Toggle the state
  };

  const totalAmount = calculateTotal();
  let finalTotal: number = 0
  let handlingFee: number = 0
  let gstCharges: number = 0
  let discountAmount: number = 0

// Check if totalAmount is zero
if (totalAmount === 0) {
  finalTotal = 0;
  handlingFee = 0
  gstCharges = 0
  discountAmount = 0
} else {
  // Calculate percentage-based handlingFee and gstCharges
  const handlingFeePercentage = selectedEvent.commission || 0; // Example: 10 for 10%
  const gstChargesPercentage = selectedEvent.tax || 0; // Example: 18 for 18%

  handlingFee = (totalAmount * handlingFeePercentage) / 100;
  gstCharges = (totalAmount * gstChargesPercentage) / 100;
  
  discountAmount = 0; // Assuming no discount

  // Calculate finalTotal
  finalTotal = totalAmount + handlingFee + gstCharges - discountAmount;
}


  return (
    <div className="z-20 flex flex-col w-full mt-5">
      <img
        src={selectedEvent.images[0].img}
        alt={selectedEvent.title}
        className="w-full h-[340px] object-cover md:h-[300px] sm:h-[250px]"
      />

      <div className="md:flex-row md:items-center md:justify-between flex flex-col w-full mt-4">
        <div className="md:w-1/2 flex flex-col w-full">
          <h3 className="mt-2 mb-2 text-xl font-normal text-white">
            {selectedEvent.title}
          </h3>

          {/* PARTICULARS */}
          <div className="md:flex-row md:items-end flex flex-col gap-4">
            <div className="flex items-center gap-1 mb-2">
              {new Array(starCalc.complete).fill(null).map((_, index) => (
                <FaStar key={index} className="text-amber-400 text-[10px]" />
              ))}
              {starCalc.half && (
                <FaRegStarHalfStroke className="text-amber-400 text-[10px]" />
              )}
              {new Array(starCalc.empty).fill(null).map((_, index) => (
                <FaRegStar key={index} className="text-amber-400 text-[10px]" />
              ))}
              <p className="text-white/80 ml-1 text-xs">
                {selectedEvent.rating.$numberDecimal} out of 5
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/icons/calender.png" alt="cal" className="w-4 h-4" />
              <p className="text-white/70 text-[11px]">
                {new Date(selectedEvent.start_date).toLocaleDateString() +
                  " " +
                  new Date(selectedEvent.start_date).toLocaleTimeString()}{" "}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <IoLocationSharp className="text-white/80" />
              <p className="text-white/70 text-[11px]">{selectedEvent.city}</p>
            </div>
          </div>
        </div>
        <button
          onClick={showOnMap}
          className="flex border-[0.5px] border-white/50 bg-white/20 items-center justify-center w-[28px] h-[28px] rounded-lg mt-4 md:mt-0"
        >
          <img src="/icons/map.png" alt="map" />
        </button>
      </div>

      {/* Pass Selection */}
      <div>
        <h2 className="mt-8 mb-4 text-xl text-white">Choose pass type <button
        onClick={handleButtonClick}
        className={`p-2 rounded text-purple ${
          buyOthers ? "bg-purple-500" : "bg-gray-500"
        } transition-colors duration-300`}
      >
        {buyOthers ? "Buying For Others" : "Buy For Others"}
      </button> </h2>
       <div className="md:grid-cols-4 grid grid-cols-1 gap-4">
          {selectedPasses.map((pass) => (
            <div
              key={pass._id}
              className={`border p-4 rounded-lg text-gray-800 ${
                pass.quantity > 0 ? "border-white" : "border-transparent"
              } bg-white bg-opacity-5`}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {pass.title}
                  </h3>
                  <div className="p-2 text-xs bg-gray-200 rounded-full">
                    Rs. {pass.amount}
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Without any additional perks
                </p>
                <p className="text-customYellow mt-2 text-xs">
                  {pass.available_tickets - pass.tickets_sold} Spots left
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-white">
                <p>Total: Rs. {pass.amount * pass.quantity}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(pass._id, -1)}
                    className="flex items-center justify-center w-5 h-5 text-white bg-transparent border border-white rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-1">{pass.quantity}</span>
                  <button
                    onClick={() => {
                      setSelectedPass(pass);
                      handleSelectedPass(pass);
                      buyOthers ? setModalOpen(true) : updateQuantity(pass._id, 1)
                    }}
                    className="flex items-center justify-center w-5 h-5 text-white bg-transparent border border-white rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="sm:mt-8 mt-4 text-white">
        {/* Order Summary Header */}
        <h2 className=" text-xl text-white">Order Summary</h2>

        {/* Price and Handling Fee */}
        {userCards.map((user, index) => (
          <div className="flex justify-between py-2 text-sm">
            <span className="flex items-center space-x-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"
                  fill="white"
                />
              </svg>

              <span>{user.name}</span>
              <button
                onClick={() => removeUserCard(index)}
                className="bg-website-purple sm:mt-0 sm:w-auto w-full px-4 py-2 mt-4 text-white rounded-md"
              >
                Remove
              </button>

            </span>
            <span>$ {selectedPass.amount}</span>
          </div>
        ))}
        <div className="flex justify-between py-2 text-sm mt-4 border-t">
          <span className="flex items-center space-x-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_757_53247)">
                <path
                  d="M15.2702 0.303657C15.2238 0.188067 15.1346 0.0948197 15.0212 0.0433148C14.9078 -0.00819016 14.7789 -0.0139874 14.6613 0.027129C14.5437 0.0682455 14.4465 0.15311 14.3899 0.264068C14.3333 0.375025 14.3217 0.503533 14.3574 0.622857C15.1006 2.75886 13.6254 4.35406 12.5006 5.20846L12.0462 4.55726C11.8934 4.33886 11.5518 4.15726 11.2862 4.15406L8.7358 4.16526C8.42425 4.17467 8.12103 4.26809 7.8582 4.43566L0.343004 9.70526C0.1682 9.82827 0.0492592 10.0155 0.0122242 10.226C-0.0248108 10.4366 0.0230774 10.6532 0.145404 10.8285L3.5606 15.7149C3.8166 16.0789 4.2254 16.0349 4.5902 15.7805L12.1054 10.5101C12.3214 10.3573 12.571 10.0277 12.659 9.77566L13.4574 7.25966C13.5454 7.00846 13.4918 6.62526 13.339 6.40686L13.0622 6.01006C14.5726 4.85246 16.1406 2.80686 15.2702 0.303657ZM11.7734 7.79006C11.635 7.88697 11.4788 7.95565 11.3138 7.99218C11.1488 8.02871 10.9782 8.03237 10.8118 8.00295C10.6453 7.97353 10.4864 7.91161 10.3439 7.82072C10.2014 7.72983 10.0782 7.61176 9.98141 7.47326C9.78535 7.19298 9.70851 6.84637 9.76775 6.5095C9.827 6.17262 10.0175 5.87302 10.2974 5.67646C10.5168 5.52271 10.7788 5.44137 11.0468 5.44381C11.3147 5.44625 11.5752 5.53234 11.7918 5.69006C11.5742 5.82126 11.4246 5.89806 11.3966 5.91006C11.2974 5.95734 11.2173 6.03691 11.1692 6.13572C11.1212 6.23453 11.1082 6.34672 11.1322 6.45391C11.1563 6.56111 11.2161 6.65694 11.3018 6.72572C11.3874 6.79449 11.4939 6.83213 11.6038 6.83246C11.6726 6.83246 11.743 6.81646 11.8094 6.78526C11.9646 6.71166 12.131 6.62446 12.3046 6.52126C12.3445 6.76131 12.3159 7.00775 12.2219 7.23222C12.1279 7.45669 11.9725 7.65006 11.7734 7.79006Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_757_53247">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Price</span>
          </span>
          <span>$ {totalAmount}</span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="flex items-center space-x-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 14C2.96667 14 2.65289 13.8696 2.392 13.6087C2.13111 13.3478 2.00044 13.0338 2 12.6667V3.33333C2 2.96667 2.13067 2.65289 2.392 2.392C2.65333 2.13111 2.96711 2.00044 3.33333 2H10.6667L14 5.33333V12.6667C14 13.0333 13.8696 13.3473 13.6087 13.6087C13.3478 13.87 13.0338 14.0004 12.6667 14H3.33333ZM4.66667 11.3333H11.3333V10H4.66667V11.3333ZM4.66667 8.66667H11.3333V7.33333H4.66667V8.66667ZM10 6H12.6667L10 3.33333V6ZM4.66667 6H8V4.66667H4.66667V6Z"
                fill="white"
              />
            </svg>{" "}
            <span className="text-white">Handling Fee</span>
          </span>
          <span>$ {handlingFee}</span>
        </div>

        {/* Coupon Section */}
        <div className="mt-8">
          <div className="mb-2">Coupon</div>
          <div className="bg-opacity-5 w-full px-4 py-2 mb-2 text-white bg-white rounded-md">
            <div className="flex items-center space-x-3 text-xs">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9463 2.09569C13.4034 1.63303 12.7135 1.37891 12.0003 1.37891C11.287 1.37891 10.5971 1.63303 10.0543 2.09569L8.70626 3.24469C8.54615 3.38127 8.34704 3.46385 8.13726 3.48069L6.37226 3.62069C5.66129 3.67739 4.99378 3.98554 4.48945 4.48987C3.98512 4.9942 3.67696 5.66172 3.62026 6.37269L3.48026 8.13869C3.46314 8.34858 3.3802 8.54771 3.24326 8.70769L2.09526 10.0557C1.63287 10.5985 1.37891 11.2882 1.37891 12.0012C1.37891 12.7142 1.63287 13.4039 2.09526 13.9467L3.24326 15.2957C3.37984 15.4558 3.46243 15.6549 3.47926 15.8647L3.62026 17.6297C3.67696 18.3407 3.98512 19.0082 4.48945 19.5125C4.99378 20.0168 5.66129 20.325 6.37226 20.3817L8.13726 20.5217C8.3475 20.5386 8.54701 20.6216 8.70726 20.7587L10.0543 21.9067C10.5971 22.3694 11.287 22.6235 12.0003 22.6235C12.7135 22.6235 13.4034 22.3694 13.9463 21.9067L15.2943 20.7587C15.4546 20.6219 15.6541 20.5393 15.8643 20.5227L17.6293 20.3817C18.3402 20.325 19.0077 20.0168 19.5121 19.5125C20.0164 19.0082 20.3246 18.3407 20.3813 17.6297L20.5213 15.8647C20.5379 15.6546 20.6205 15.4551 20.7573 15.2947L21.9063 13.9477C22.3689 13.4049 22.623 12.7149 22.623 12.0017C22.623 11.2884 22.3689 10.5985 21.9063 10.0557L20.7573 8.70769C20.6205 8.54731 20.5379 8.34781 20.5213 8.13769L20.3813 6.37269C20.3246 5.66172 20.0164 4.9942 19.5121 4.48987C19.0077 3.98554 18.3402 3.67739 17.6293 3.62069L15.8633 3.48069C15.6535 3.46385 15.4544 3.38127 15.2943 3.24469L13.9463 2.09569ZM14.8283 7.75869L16.2433 9.17269L9.17226 16.2447L7.75726 14.8297L14.8283 7.75869ZM10.2323 10.2337C10.0939 10.377 9.92838 10.4912 9.74537 10.5698C9.56236 10.6485 9.36553 10.6898 9.16636 10.6916C8.96719 10.6933 8.76968 10.6553 8.58533 10.5799C8.40099 10.5045 8.23351 10.3931 8.09267 10.2523C7.95183 10.1114 7.84045 9.94396 7.76503 9.75962C7.68961 9.57527 7.65166 9.37776 7.65339 9.17859C7.65512 8.97942 7.6965 8.78259 7.77511 8.59958C7.85372 8.41658 7.968 8.25106 8.11126 8.11269C8.39417 7.83945 8.77307 7.68826 9.16636 7.69168C9.55966 7.6951 9.93588 7.85285 10.214 8.13096C10.4921 8.40907 10.6499 8.78529 10.6533 9.17859C10.6567 9.57188 10.5055 9.95078 10.2323 10.2337ZM13.7683 15.8907C13.6226 15.7529 13.506 15.5874 13.4254 15.4038C13.3447 15.2203 13.3017 15.0224 13.2989 14.8219C13.2961 14.6214 13.3335 14.4224 13.4089 14.2367C13.4842 14.0509 13.5961 13.8821 13.7379 13.7403C13.8796 13.5985 14.0483 13.4865 14.2341 13.4111C14.4198 13.3356 14.6188 13.2981 14.8193 13.3008C15.0197 13.3036 15.2176 13.3465 15.4012 13.427C15.5849 13.5075 15.7505 13.6241 15.8883 13.7697C16.1532 14.054 16.2975 14.4301 16.2906 14.8187C16.2838 15.2073 16.1263 15.5781 15.8515 15.8529C15.5767 16.1278 15.2059 16.2852 14.8173 16.292C14.4287 16.2989 14.0526 16.1546 13.7683 15.8897"
                  fill="#FEFEFE"
                />
              </svg>
              <span>Apply Coupon</span>
            </div>
            <hr className="my-2 border-gray-300" />{" "}
            {/* This line adds a separator */}
            <div className="flex justify-between">
              <a href="#" className=" text-xs text-purple-500">
                View all Coupons
              </a>
              <span className="text-customYellow flex items-center space-x-3 text-xs cursor-pointer">
                Apply
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49961 2.77474C7.65794 2.77474 7.81628 2.83307 7.94128 2.95807L13.3746 8.39141C14.2579 9.27474 14.2579 10.7247 13.3746 11.6081L7.94128 17.0414C7.69961 17.2831 7.29961 17.2831 7.05794 17.0414C6.81628 16.7997 6.81628 16.3997 7.05794 16.1581L12.4913 10.7247C12.8913 10.3247 12.8913 9.67474 12.4913 9.27474L7.05794 3.84141C6.81628 3.59974 6.81628 3.19974 7.05794 2.95807C7.18294 2.8414 7.34128 2.77474 7.49961 2.77474Z"
                    fill="#FFEB60"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Discount and GST Charges */}
        <div className="flex justify-between py-2 mt-4 text-sm">
          <span className="flex items-center space-x-3">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.58667 11.6067C6.10667 12.1267 6.95333 12.1267 7.47333 11.6067L11.6133 7.46667C12.1333 6.94667 12.1333 6.1 11.6133 5.58L6.42 0.386667C6.16676 0.139535 5.82717 0.000830218 5.47333 0L1.33333 0C0.6 0 0 0.6 0 1.33333V5.47333C0 5.82667 0.14 6.16667 0.393333 6.41333L5.58667 11.6067ZM2.83333 2C3.05435 2 3.26631 2.0878 3.42259 2.24408C3.57887 2.40036 3.66667 2.61232 3.66667 2.83333C3.66667 3.05435 3.57887 3.26631 3.42259 3.42259C3.26631 3.57887 3.05435 3.66667 2.83333 3.66667C2.61232 3.66667 2.40036 3.57887 2.24408 3.42259C2.0878 3.26631 2 3.05435 2 2.83333C2 2.61232 2.0878 2.40036 2.24408 2.24408C2.40036 2.0878 2.61232 2 2.83333 2Z"
                fill="white"
              />
            </svg>
            <span>Discount Amount</span>
          </span>
          <span>$ {discountAmount}</span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="flex items-center space-x-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_757_53225)">
                <path
                  d="M7.60661 0.0796875L0.606612 3.07969C0.169112 3.26719 -0.0746379 3.73594 0.0222371 4.19844C0.119112 4.66094 0.525362 4.99844 1.00036 4.99844V5.24844C1.00036 5.66406 1.33474 5.99844 1.75036 5.99844H14.2504C14.666 5.99844 15.0004 5.66406 15.0004 5.24844V4.99844C15.4754 4.99844 15.8847 4.66406 15.9785 4.19844C16.0722 3.73281 15.8285 3.26406 15.3941 3.07969L8.39411 0.0796875C8.14411 -0.0265625 7.85661 -0.0265625 7.60661 0.0796875ZM4.00036 6.99844H2.00036V13.1328C1.98161 13.1422 1.96286 13.1547 1.94411 13.1672L0.444112 14.1672C0.0784871 14.4109 -0.0871379 14.8672 0.0409871 15.2891C0.169112 15.7109 0.559737 15.9984 1.00036 15.9984H15.0004C15.441 15.9984 15.8285 15.7109 15.9566 15.2891C16.0847 14.8672 15.9222 14.4109 15.5535 14.1672L14.0535 13.1672C14.0347 13.1547 14.016 13.1453 13.9972 13.1328L14.0004 6.99844H12.0004V12.9984H10.7504V6.99844H8.75036V12.9984H7.25036V6.99844H5.25036V12.9984H4.00036V6.99844ZM8.00036 1.99844C8.26558 1.99844 8.51993 2.10379 8.70747 2.29133C8.89501 2.47887 9.00036 2.73322 9.00036 2.99844C9.00036 3.26365 8.89501 3.51801 8.70747 3.70554C8.51993 3.89308 8.26558 3.99844 8.00036 3.99844C7.73515 3.99844 7.48079 3.89308 7.29326 3.70554C7.10572 3.51801 7.00036 3.26365 7.00036 2.99844C7.00036 2.73322 7.10572 2.47887 7.29326 2.29133C7.48079 2.10379 7.73515 1.99844 8.00036 1.99844Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_757_53225">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>GST Charges</span>
          </span>
          <span>$ {gstCharges}</span>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between py-4 mt-4 border-t">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">$ {finalTotal}</span>
        </div>

        {/* Payment Options */}
        <div className="mt-6 mb-4">
          <div className="mb-2 text-sm">Powered by</div>
          <div className="sm:flex-row sm:items-center sm:justify-between flex flex-col">
            <div className="sm:justify-start flex flex-wrap items-center justify-center gap-3">
              <img src="/icons/image.png" alt="PayPal" className="w-16" />
              <img src="/icons/image.png" alt="Stripe" className="w-16" />
              <img src="/icons/image.png" alt="Razorpay" className="w-16" />
            </div>
            <button className="bg-website-purple sm:mt-0 sm:w-auto w-full px-4 py-2 mt-4 text-white rounded-md" onClick={payNowSubmit}>
              Pay Now
            </button>
          </div>
        </div>

        {/* Pay Now Button */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          <div className="bg-gradient-to-b from-website-purple to-website-purple-dark sm:max-w-md md:max-w-lg lg:max-w-xl w-full max-w-sm p-6 rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Add Details
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="focus:outline-none focus:ring focus:ring-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="focus:outline-none focus:ring focus:ring-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-white"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className="focus:outline-none focus:ring focus:ring-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="bg-website-purple sm:mt-0 sm:w-auto w-full px-4 py-2 mt-4 text-white rounded-md"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-website-purple sm:mt-0 sm:w-auto w-full px-4 py-2 mt-4 text-white rounded-md"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default EventBookCard;


