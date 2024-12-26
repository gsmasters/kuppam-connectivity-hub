export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          {/* Left Leader */}
          <div className="w-1/3 flex items-center gap-4 animate-fade-in">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="h-20 md:h-28 w-auto transition-all duration-300 ease-in-out hover:scale-105"
              loading="eager"
            />
            <div className="text-white">
              <h3 className="text-lg md:text-xl font-semibold">Sri Nara Chandrababu Naidu</h3>
              <p className="text-sm md:text-base">Hon'ble Chief Minister</p>
              <p className="text-sm md:text-base">Government of Andhra Pradesh</p>
            </div>
          </div>

          {/* Center AP Government Logo */}
          <div className="w-1/3 flex justify-center">
            <img
              src="/lovable-uploads/98fc557c-f030-47e5-b436-9ca89f17cab7.png"
              alt="Government of Andhra Pradesh"
              className="h-28 w-28 object-contain transition-all duration-300 transform hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Right Leader */}
          <div className="w-1/3 flex items-center gap-4 justify-end animate-fade-in">
            <div className="text-white text-right">
              <h3 className="text-lg md:text-xl font-semibold">Sri Konidala Pawan Kalyan</h3>
              <p className="text-sm md:text-base">Hon'ble Deputy Chief Minister and</p>
              <p className="text-sm md:text-base">Minister for PR & RD, Rural Water</p>
              <p className="text-sm md:text-base">Supply, EFS&T Departments</p>
              <p className="text-sm md:text-base">Government of Andhra Pradesh</p>
            </div>
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="h-20 md:h-28 w-auto transition-all duration-300 ease-in-out hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};