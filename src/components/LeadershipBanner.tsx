export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center py-4">
          {/* Government Logos Section */}
          <div className="flex items-center justify-center gap-8 mb-4 bg-white px-8 py-2 rounded-lg">
            <img
              src="/lovable-uploads/076524a7-e1f6-400f-8beb-9f1cd23ec897.png"
              alt="Government of Andhra Pradesh and Panchayati Raj Logos"
              className="h-16 w-auto"
              loading="eager"
            />
          </div>
          
          {/* Leaders Section */}
          <div className="flex justify-center items-center gap-8 md:gap-24">
            <div className="w-auto h-auto flex items-center justify-center animate-fade-in">
              <img
                src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                alt="TDP President Sri Nara Chandrababu Naidu"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out"
                loading="eager"
              />
            </div>
            <div className="w-auto h-auto flex items-center justify-center animate-fade-in">
              <img
                src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                alt="Jana Sena President Sri Konidala Pawan Kalyan"
                className="h-16 md:h-24 w-auto transition-all duration-300 ease-in-out"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};