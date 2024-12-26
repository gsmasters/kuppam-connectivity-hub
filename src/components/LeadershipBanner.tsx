export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center py-4">
          {/* AP Government Logo Section */}
          <div className="bg-white rounded-full p-4 mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <img
              src="/lovable-uploads/e1944a3b-0d70-4eed-861b-d2818beee246.png"
              alt="Government of Andhra Pradesh"
              className="h-24 w-24 object-contain"
              loading="eager"
            />
          </div>
          
          {/* Leaders Section */}
          <div className="flex justify-center items-center gap-8 md:gap-24 px-4">
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