export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-4 px-2 sm:px-4 gap-4 sm:gap-0">
          {/* Left Leader - responsive sizing */}
          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end sm:pr-8 animate-fade-in">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="h-12 sm:h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
              loading="eager"
            />
          </div>

          {/* Center AP Government Logo */}
          <div className="w-full sm:w-1/3 flex justify-center">
            <img
              src="/lovable-uploads/98fc557c-f030-47e5-b436-9ca89f17cab7.png"
              alt="Government of Andhra Pradesh"
              className="h-20 sm:h-24 w-20 sm:w-24 object-contain transition-all duration-300 transform hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Right Leader - responsive sizing */}
          <div className="w-full sm:w-1/3 flex justify-center sm:justify-start sm:pl-8 animate-fade-in">
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="h-12 sm:h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};