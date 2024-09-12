import Calendar from "react-calendar";
import { Value } from "../../types/Components";
import { useState } from "react";
import { FcCalendar } from "react-icons/fc";

export type DateProps = {
  start: Value;
  end: Value;
};

const CalendarModal = () => {
  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<"start" | "end">("start");
  const [value, setValue] = useState<Value>(new Date());
  const [date, setDate] = useState<DateProps>({
    start: null,
    end: null,
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDateChange = (value: Value) => {
    setValue(value);

    if (value) {
      if (activeDate === "start") {
        setDate((prevDate) => ({ ...prevDate, start: value }));
      } else {
        setDate((prevDate) => ({ ...prevDate, end: value }));
      }
    }
  };

  const handleReset = () => {
    setDate({ start: null, end: null });
    setValue(new Date());
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-3 px-4 py-2"
      >
        Calendar <FcCalendar />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Container */}
          <div className="bg-white w-[400px] rounded-[20px] p-6 relative">
            <div className="flex justify-around w-full">
              {/* Highlight active tab */}
              <button
                onClick={() => setActiveDate("start")}
                className={`px-6 ${
                  activeDate === "start" ? "border-b border-red-400" : ""
                }`}
              >
                Start Date
              </button>
              <button
                onClick={() => setActiveDate("end")}
                className={`px-6 ${
                  activeDate === "end" ? "border-b border-red-400" : ""
                }`}
              >
                End Date
              </button>
            </div>

            {/* Calendar */}
            <div className="h-fit relative flex flex-col items-start w-full mt-8">
              <div className="h-fit w-full mt-4">
                <Calendar value={value} onChange={handleDateChange} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around w-full m-auto mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-[#8560bc] rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-[#8560bc] rounded-md"
              >
                Reset
              </button>
              <button
                className="bg-[#8560bc] px-4 py-2 text-white border rounded-md"
                onClick={() => {
                  console.log("Apply Clicked", date);
                  handleCloseModal();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarModal;
