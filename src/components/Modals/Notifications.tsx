import { useDispatch } from "react-redux";

//  COMPONENTS
import { GoArrowLeft } from "react-icons/go";

//  SLICES
import { toggleNotificationsModalState } from "../../slices/AppMechanics";

const Notifications = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 overflow-y-scroll p-6 flex flex-col bg-white h-[200vh] lg:w-[35%] xl:w-3/12 z-50 right-0">
      <div className="relative flex items-center justify-center">
        <h4 className="text-xl">Notifications</h4>
        <button
          onClick={() => dispatch(toggleNotificationsModalState(false))}
          className="absolute left-0"
        >
          <GoArrowLeft className="text-xl" />
        </button>
      </div>

      {/* // TODO: MAKE IT DYNAMIC */}
      <div className="h-fit flex flex-col w-full gap-6 mt-8">
        <div className="flex flex-col w-full">
          <h5 className="font-medium text-gray-700">Today</h5>
          {/* // TODO: MAP THE SUB-ARRAY HERE */}
          <div className="h-fit flex flex-col w-full mt-3">
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h5 className="font-medium text-gray-700">Yesterday</h5>
          {/* // TODO: MAP THE SUB-ARRAY HERE */}
          <div className="h-fit flex flex-col w-full mt-3">
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h5 className="font-medium text-gray-700">June 10</h5>
          {/* // TODO: MAP THE SUB-ARRAY HERE */}
          <div className="h-fit flex flex-col w-full mt-3">
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
            <div className="flex items-center justify-between w-full py-2 border-b border-gray-300">
              <div className="flex items-start gap-2">
                <img
                  src="/madisonp3.jpg"
                  alt="madi"
                  className="w-11 h-11 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h5 className="text-sm font-medium text-gray-900">
                    Ticket booking confirmation
                  </h5>
                  <p className="text-light text-[10px] text-gray-600">
                    3 tickets has been added successfully!
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-700">7:30PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
