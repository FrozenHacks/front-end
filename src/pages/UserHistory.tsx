import { useState, useEffect } from "react";
import axios from "axios";

// Define a type for event details
interface Event {
  _id: string;
  transaction_id: any;
  purchased_by: string;
  purchased_for: string;
  event_id: any;
  event: any;
  organizer: string;
  organizerImage: string;
  passType: string;
  tickets: number;
  total: number;
  qr_code: string;
  image: string;
  title: string;
  start_date: string;
  start_time: string;
  city: string;
  address: string;
  pricing_array: any;
  amount: any;
  status: string
}

const UserHistory = () => {
const BASEURL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [activeTab, setActiveTab] = useState<"Active" | "Completed">("Active");
  const [tickets, setTickets] = useState<Event[]>([]);
  const [completedTickets, setCompletedTickets] = useState<Event[]>([]);
  const token = sessionStorage.getItem("token");

  // Fetch tickets from API
  useEffect(() => {
    fetchTickets();
  }, [token]);

  const fetchTickets = async () => {
    try {
      const response = await axios({
        url: `${BASEURL}/transactions/booking-history`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const liveData = [
        ...response.data.tickets.filter(
          (ticket: any) => ticket.event_id.status === "LIVE"
        ),
        ...response.data.traditionalTransactions.filter(
          (ticket: any) => ticket.event.status === "LIVE"
        ),
      ];
      const completedData = [
        ...response.data.tickets.filter(
          (ticket: any) =>
            ticket.event_id.status === "DECOMMISSIONED" ||
            ticket.event_id.status === "CANCELLED"
        ),
        ...response.data.traditionalTransactions.filter(
          (ticket: any) =>
            ticket.event.status === "DECOMMISSIONED" ||
            ticket.event.status === "CANCELLED"
        ),
      ];

      setTickets(liveData);
      setCompletedTickets(completedData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleCancelBooking = async (tx_id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      const body = {
        transaction_id: tx_id,
      };
      const response = await axios.post(
        `${BASEURL}/tickets/initiate-refund`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("Form submitted successfully", response.data);
      fetchTickets()
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleTraditionalCancelBooking = async (tx_id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      const body = {
        traditionalTransaction_id: tx_id,
      };
      const response = await axios.post(
        `${BASEURL}/transactions/traditional-txn/initiate-refund`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("Form submitted successfully", response.data);
      fetchTickets()
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error (e.g., show an error message)
    }
  };


  // Handler for tab click
  const handleTabClick = (tab: "Active" | "Completed") => {
    setActiveTab(tab);
  };

  // Data based on the active tab
  const displayedTickets = activeTab === "Active" ? tickets : completedTickets;

  return (
    <div className="md:px-8 flex flex-col items-center min-h-screen px-4 py-8">
      <h1 className="mb-6 text-2xl text-center text-white">Booking History</h1>
      <div className="flex justify-center p-2 mb-6 border rounded-full">
        <button
          className={`px-44 flex-1 py-2 ${
            activeTab === "Active"
              ? "bg-opacity-90 bg-purple-500 text-white"
              : "bg-opacity-5"
          } rounded-l-full`}
          onClick={() => handleTabClick("Active")}
        >
          Active
        </button>
        <button
          className={`px-44 flex-1 py-2 ${
            activeTab === "Completed"
              ? "bg-opacity-90 bg-purple-500 text-white"
              : "bg-opacity-5"
          } rounded-r-full`}
          onClick={() => handleTabClick("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col items-center w-full space-y-6">
        {displayedTickets.map((ticket, index) => (
          <div
            key={index}
            className="rounded-lg w-full md:w-[800px] lg:w-[1000px] xl:w-[1300px] flex flex-col md:flex-row items-center p-4 md:p-5 space-y-4 md:space-y-0 md:space-x-5 shadow-lg bg-gray-100"
          >
            <img
              src={
                ticket.event_id
                  ? ticket.event_id.images[0].img
                  : ticket.event.images[0].img
              }
              alt={ticket.event_id ? ticket.event_id.title : ticket.event.title}
              className="md:w-36 object-cover w-full h-24 rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold">
                {ticket.event_id ? ticket.event_id.title : ticket.event.title}
              </h2>
              <p className="md:flex-row md:items-center md:space-x-2 flex flex-col text-sm">
                <span>
                  {ticket.event_id
                    ? ticket.event_id.start_date
                    : ticket.event.start_date}{" "}
                  |{" "}
                  {ticket.event_id
                    ? ticket.event_id.start_time
                    : ticket.event.start_time}
                </span>
                <span className="md:mt-0 flex items-center mt-1">
                  <span>
                    {ticket.event_id
                      ? ticket.event_id.address
                      : ticket.event.address}
                  </span>
                </span>
              </p>
              {/* <div className="flex items-center mt-1 space-x-2">
                <img
                  src={ticket.organizerImage}
                  alt={ticket.organizer}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-sm">{ticket.organizer}</p>
              </div> */}
              <div className="flex items-center mt-2 space-x-4">
                <span className="px-2 py-1 text-white bg-yellow-600 rounded">
                  {ticket.passType}
                </span>
                <span>
                  No of Tickets:{" "}
                  {ticket.event_id ? 1 : ticket.pricing_array[0].count}
                </span>
                {/* <span>
                  Total: ₹
                  {ticket.event_id
                    ? ticket.transaction_id.amount
                    : ticket.amount}
                </span> */}
              </div>
              <div className="flex mt-2 space-x-2">
              {activeTab === "Active" && (
  (ticket.event_id
    ? ticket.event_id.refundable
    : ticket.event.refundable) && 
  (
    (ticket.event_id && ticket.transaction_id && ticket.transaction_id.status === "INITIATED REFUND") ||
    (!ticket.event_id && ticket.status === "INITIATED REFUND")
  ) && (
    <button className="px-4 py-1 text-purple-700 bg-white border border-purple-700 rounded-full">
      Initiated Refund
    </button>
  ) ||
  (
    (ticket.event_id && ticket.transaction_id && ticket.transaction_id.status === "REFUND REJECTED") ||
    (!ticket.event_id && ticket.status === "REFUND REJECTED")
  ) && (
    <button className="px-4 py-1 text-purple-700 bg-white border border-purple-700 rounded-full">
      Refund Rejected
    </button>
  ) ||
  (
    (ticket.event_id && ticket.transaction_id && ticket.transaction_id.status === "REFUNDED") ||
    (!ticket.event_id && ticket.status === "REFUNDED")
  ) && (
    <button className="px-4 py-1 text-purple-700 bg-white border border-purple-700 rounded-full">
      Refunded
    </button>
  ) ||
  (
    <button className="px-4 py-1 text-purple-700 bg-white border border-purple-700 rounded-full" 
      onClick={() => { 
        ticket.event_id 
          ? handleCancelBooking(ticket.transaction_id._id)
          : handleTraditionalCancelBooking(ticket._id);
      }}>
      Cancel Booking
    </button>
  )
)}

                <button className="px-4 py-1 text-white bg-purple-700 rounded-full">
                  Download Ticket
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img src={ticket.qr_code} alt="QR Code" className="w-16 h-16" />
              <p className="mt-1 text-xs">
                Scan the QR code to get tickets on mobile
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHistory;
