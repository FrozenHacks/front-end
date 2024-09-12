const IntroductoryComponent = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <span className="text-5xl font-medium text-white">
          One stop destination for all your events
        </span>
        <span className="text-2xl font-light text-white">
          Connect, Discover and Experience
        </span>
      </div>
      <button className="bg-website-purple w-32 items-center justify-center py-2 rounded-lg">
        <p className="font-medium text-white">Book Now</p>
      </button>
    </div>
  );
};

export default IntroductoryComponent;
