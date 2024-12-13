export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/20">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg bg-white">
              <img
                src="/lovable-uploads/11889f01-b523-4671-b93b-457ede5835f4.png"
                alt="TDP President"
                className="w-full h-full object-contain"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">TDP National President</p>
              <p className="text-base font-bold text-gray-900">Sri Nara Chandrababu Naidu</p>
              <p className="text-xs text-gray-500">Hon'ble Chief Minister</p>
              <p className="text-xs text-gray-500">Government of Andhra Pradesh</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Jana Sena Party President</p>
              <p className="text-base font-bold text-gray-900">Sri Konidala Pawan Kalyan</p>
              <p className="text-xs text-gray-500">Hon'ble Deputy Chief Minister and</p>
              <p className="text-xs text-gray-500">Minister for PR & RD, Rural Water Supply, APSET Department</p>
            </div>
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg bg-white">
              <img
                src="/lovable-uploads/381e55c7-ff55-497a-ab2f-729bc3e1c9fd.png"
                alt="Jana Sena President"
                className="w-full h-full object-contain"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};