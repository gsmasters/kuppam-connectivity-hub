export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center py-4">
          {/* AP Government Logo Section */}
          <div className="w-full flex justify-center mb-4">
            <div className="hover:scale-105 transition-transform duration-300 bg-white rounded-full p-2 shadow-lg">
              <img
                src="/lovable-uploads/b531674c-95ec-44a8-910d-0060145f90ed.png"
                alt="Government of Andhra Pradesh"
                className="h-20 w-20 object-contain"
                loading="eager"
              />
            </div>
          </div>
          
          {/* Leaders Section */}
          <div className="flex justify-center items-center gap-8 md:gap-24">
            <div className="w-auto h-auto flex items-center justify-center animate-fade-in">
              <img
                src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                alt="TDP President Sri Nara Chandrababu Naidu"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="w-auto h-auto flex items-center justify-center animate-fade-in">
              <img
                src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                alt="Jana Sena President Sri Konidala Pawan Kalyan"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};