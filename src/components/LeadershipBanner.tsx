export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          {/* Left Leader */}
          <div className="w-1/4 flex justify-start animate-fade-in">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Center AP Government Logo */}
          <div className="w-1/4 flex justify-center">
            <div className="bg-white bg-opacity-90 rounded-full p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <img
                src="/lovable-uploads/e1944a3b-0d70-4eed-861b-d2818beee246.png"
                alt="Government of Andhra Pradesh"
                className="h-20 w-20 object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* Right Leader */}
          <div className="w-1/4 flex justify-end animate-fade-in">
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
  );
};