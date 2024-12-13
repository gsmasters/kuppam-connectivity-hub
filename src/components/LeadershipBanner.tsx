export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="w-24 h-24 overflow-hidden rounded-lg shadow-xl">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="w-full h-full object-contain bg-blue-950/80"
              loading="eager"
            />
          </div>
          <div className="w-24 h-24 overflow-hidden rounded-lg shadow-xl">
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="w-full h-full object-contain bg-blue-950/80"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};