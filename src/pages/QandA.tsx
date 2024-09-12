import QandACard from "../components/QandA/QandACard";

const QandA = () => {
  const Questions = [
    "How do I book an event?",
    "What payments method do you accept?",
    "Can I cancel or change my booking?",
    "How can I get a refund?",
    "What should do if I encounter some issues while booking?",
  ];

  return (
    <div className="sm:h-screen sm:px-40 bg-website-purple bg-gradient-three-colors-vertical flex flex-col items-center w-screen h-full gap-20 px-4 py-10 text-white">
      <div className="z-30 flex flex-col items-center w-full h-full">
        <h1 className="sm:text-4xl text-xs tracking-wide">
          Frequently Asked Questions
        </h1>

        <div className="sm:mt-24 flex flex-col w-full gap-6 mt-8">
          {Questions.map((quest) => (
            <QandACard key={quest} quest={quest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QandA;
