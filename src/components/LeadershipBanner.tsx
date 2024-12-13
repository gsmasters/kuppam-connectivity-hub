export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="w-16 h-16 pl-2">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="w-16 h-16 pr-2">
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};