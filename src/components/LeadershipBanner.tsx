export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-24 py-4">
          <div className="w-auto h-auto flex items-center justify-center opacity-0 animate-fade-in">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="max-h-24 w-auto transition-all duration-300 ease-in-out"
              loading="eager"
            />
          </div>
          <div className="w-auto h-auto flex items-center justify-center opacity-0 animate-fade-in">
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="max-h-24 w-auto transition-all duration-300 ease-in-out"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};