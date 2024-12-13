export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex justify-center items-center gap-16">
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                  alt="TDP President Sri Nara Chandrababu Naidu"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  loading="eager"
                />
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                  alt="Jana Sena President Sri Konidala Pawan Kalyan"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};