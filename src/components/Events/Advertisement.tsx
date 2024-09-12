const Advertisement = () => {
  return (
    <div className="w-full relative bg-gradient-to-t from-website-purple-dark to-customPurple px-40 py-10 bg-website-purple h-[460px]">
      {/* ADD ADVERTISEMENT PIC HERE */}
      <img
        src="/madison.jpeg"
        alt="madison"
        className="object-cover w-full h-full"
      />
      <div className="flex items-center justify-center w-full h-full bg-white">
        ADVERTISEMENT HERE
      </div>
    </div>
  );
};

export default Advertisement;
