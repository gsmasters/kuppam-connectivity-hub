export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2 sm:py-4 px-2 sm:px-4">
          {/* Left Leader - shifted slightly right */}
          <div className="w-1/3 flex justify-end pr-2 sm:pr-8 animate-fade-in">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="h-12 sm:h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
              loading="eager"
            />
          </div>

          {/* Center AP Government Logo */}
          <div className="w-1/3 flex justify-center">
            <img
              src="/lovable-uploads/98fc557c-f030-47e5-b436-9ca89f17cab7.png"
              alt="Government of Andhra Pradesh"
              className="h-16 sm:h-20 md:h-28 w-auto object-contain transition-all duration-300 transform hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Right Leader - shifted slightly left */}
          <div className="w-1/3 flex justify-start pl-2 sm:pl-8 animate-fade-in">
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