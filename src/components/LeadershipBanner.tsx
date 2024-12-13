export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#1A1F2C] via-[#403E43] to-[#6E59A5] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-8">
          <div className="flex justify-center items-center gap-16">
            <img
              src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
              alt="TDP President Sri Nara Chandrababu Naidu"
              className="w-48 h-48 rounded-xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
              loading="eager"
            />
            <img
              src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
              alt="Jana Sena President Sri Konidala Pawan Kalyan"
              className="w-48 h-48 rounded-xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};