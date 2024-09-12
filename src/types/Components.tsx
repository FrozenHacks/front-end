import { TCategory, TEvent } from "./Slices";

export type TEventsCard = {
  data: TEvent;
};

export type TEventsCategory = {
  data: {
    title: string;
    carousel: Array<TEvent>;
  };
};

export type TBrowseCategoriesCards = {
  data: TCategory;
};

export type TNavbar = {
  ModalRef: React.RefObject<HTMLDivElement>;
};

export type TQandACard = {
  quest: string;
};

export type TCarouselCard = {
  img: string;
};

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type TTerms = {
  data: {
    title: string;
    terms: string[];
  };
};
