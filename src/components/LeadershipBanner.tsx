export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {/* Leadership Section */}
          <div className="flex justify-center items-center gap-8 md:gap-24 py-6 md:py-4 px-4">
            <div className="flex flex-col items-center animate-fade-in">
              <img
                src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                alt="TDP President Sri Nara Chandrababu Naidu"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out"
                loading="eager"
              />
              <div className="text-center mt-2">
                <p className="text-xs md:text-sm font-semibold text-white">Sri Nara Chandrababu Naidu</p>
                <p className="text-xs text-white/90">Hon'ble Chief Minister</p>
                <p className="text-xs text-white/90">Government of Andhra Pradesh</p>
              </div>
            </div>
            <div className="flex flex-col items-center animate-fade-in">
              <img
                src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                alt="Jana Sena President Sri Konidala Pawan Kalyan"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out"
                loading="eager"
              />
              <div className="text-center mt-2">
                <p className="text-xs md:text-sm font-semibold text-white">Sri Konidala Pawan Kalyan</p>
                <p className="text-xs text-white/90">Hon'ble Deputy Chief Minister and</p>
                <p className="text-xs text-white/90">Minister for Energy, Forest, Environment,</p>
                <p className="text-xs text-white/90">Science & Technology, Infrastructure &</p>
                <p className="text-xs text-white/90">Investment, CRDA Departments,</p>
                <p className="text-xs text-white/90">Government of Andhra Pradesh</p>
              </div>
            </div>
          </div>
          
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-8 py-4 bg-white">
            <img
              src="/lovable-uploads/90b94a45-6941-4036-ab59-11ecc4714ab5.png"
              alt="Government of Andhra Pradesh"
              className="h-16 w-auto"
              loading="eager"
            />
            <img
              src="/lovable-uploads/b99529cb-bd06-4434-9241-69c8dd716691.png"
              alt="Panchayati Raj"
              className="h-16 w-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};