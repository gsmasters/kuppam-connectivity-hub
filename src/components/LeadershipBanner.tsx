export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          {/* Left Leader - shifted slightly right */}
          <div className="w-1/3 flex justify-end pr-8 animate-fade-in">
            <img
              src="/uploads/tdp-president.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
              loading="eager"
            />
          </div>

          {/* Center AP Government Logo */}
          <div className="w-1/3 flex justify-center">
            <img
              src="/uploads/ap-govt-logo.png"
              alt="Government of Andhra Pradesh"
              className="h-28 w-28 object-contain transition-all duration-300 transform hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Right Leader - shifted slightly left */}
          <div className="w-1/3 flex justify-start pl-8 animate-fade-in">
            <img
              src="/uploads/janasena-president.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};