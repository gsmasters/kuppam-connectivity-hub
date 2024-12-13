export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#1A1F2C] via-[#403E43] to-[#6E59A5] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-12 border border-white/10">
          <div className="flex justify-center items-center gap-20">
            <div className="group transition-all duration-300 hover:scale-105">
              <img
                src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                alt="TDP President Sri Nara Chandrababu Naidu"
                className="w-40 h-40 rounded-full border-4 border-white/20 shadow-xl object-cover group-hover:border-white/40 transition-all duration-300"
                loading="eager"
              />
            </div>
            <div className="group transition-all duration-300 hover:scale-105">
              <img
                src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                alt="Jana Sena President Sri Konidala Pawan Kalyan"
                className="w-40 h-40 rounded-full border-4 border-white/20 shadow-xl object-cover group-hover:border-white/40 transition-all duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};