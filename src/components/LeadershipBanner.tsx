export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex justify-center items-center gap-16">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              loading="eager"
            />
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};