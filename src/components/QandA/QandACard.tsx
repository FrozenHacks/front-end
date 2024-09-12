import { useState } from "react";

//  COMPONENTS
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

//  TYPES
import { TQandACard } from "../../types/Components";

const QandACard = ({ quest }: TQandACard) => {
  const [togglePlus, setTogglePlus] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-white/25 text-start">
      <p className="text-[10px] sm:text-xl font-light">{quest}</p>
      <button onClick={() => setTogglePlus(!togglePlus)}>
        {!togglePlus ? <FaPlus /> : <FaMinus />}
      </button>
    </div>
  );
};

export default QandACard;
