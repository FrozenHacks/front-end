const QRCode = () => {
  const handleBtn = (e: React.MouseEvent, btn?: string) => {
    try {
      e.preventDefault();
      if (btn === "PS") console.log("Play store clicked!");
      else console.log("App store clicked!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit z-40 flex flex-col w-full px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="mt-10 bg-white/25 w-full py-6 sm:py-10 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] h-auto flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide text-white">
            Check out our mobile app as well!!
          </span>
          <span className="text-sm sm:text-base text-white/80 font-light tracking-wide">
            Scan the QR code to download the app
          </span>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6 items-center">
            <button
              onClick={(e) => handleBtn(e, "PS")}
              className="bg-website-purple-dark p-2 sm:p-3 w-full sm:w-auto rounded text-xs sm:text-base flex items-center justify-center gap-2 text-white"
            >
              <img
                src="/icons/PlayStore.png"
                alt="Play Store"
                className="w-4 h-4 sm:w-6 sm:h-6 object-fit"
              />
              <span className="hidden sm:inline">Download the app on Playstore</span>
              <span className="inline sm:hidden">Playstore</span>
            </button>
            <button
              onClick={(e) => handleBtn(e)}
              className="bg-website-purple-dark p-2 sm:p-3 w-full sm:w-auto rounded text-xs sm:text-base flex items-center justify-center gap-2 text-white"
            >
              <img
                src="/icons/AppStore.png"
                alt="App Store"
                className="w-4 h-4 sm:w-6 sm:h-6 object-fit"
              />
              <span className="hidden sm:inline">Download the app on Appstore</span>
              <span className="inline sm:hidden">Appstore</span>
            </button>
          </div>
        </div>
        <div className="md-2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] p-3 bg-white overflow-hidden rounded-[20px] mt-6 sm:mt-0">
          <img src="/QR.png" alt="QR" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default QRCode;
