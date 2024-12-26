export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center py-4">
          {/* Government Logos Section */}
          <div className="flex items-center justify-center gap-8 bg-white px-8 py-4 rounded-lg mb-4">
            <img
              src="/lovable-uploads/ba884af4-75f6-432c-b965-18bb9093aa87.png"
              alt="Government of Andhra Pradesh Logo"
              className="h-16 w-auto"
            />
            <div className="text-primary text-3xl font-bold">
              KUPPAM MPDO
            </div>
            <img
              src="/lovable-uploads/5d155968-8540-4a8b-9dce-f6e5561d2765.png"
              alt="Panchayati Raj Logo"
              className="h-16 w-auto"
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