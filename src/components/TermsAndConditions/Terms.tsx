//  COMPONENTS
import { BsDot } from "react-icons/bs";

//  TYPES
import { TTerms } from "../../types/Components";

const Terms = (data: TTerms) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xl text-white">{data.data.title}</h3>
      {data.data.terms.map((term) => {
        return (
          <div key={term} className="flex items-center gap-1">
            <BsDot className="text-white/50" />
            <p className="text-white/50 text-sm font-light">{term}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Terms;
