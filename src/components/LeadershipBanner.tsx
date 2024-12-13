export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg bg-white">
              <img
                src="/lovable-uploads/57f2b1fb-c86c-4452-9a64-3b33aa4298cc.png"
                alt="TDP President"
                className="w-full h-full object-cover object-top"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">TDP National President</p>
              <p className="text-base font-bold text-gray-900">Sri N. Chandrababu Naidu</p>
              <p className="text-xs text-gray-500">Former Chief Minister of AP</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Jana Sena Party President</p>
              <p className="text-base font-bold text-gray-900">Sri Pawan Kalyan</p>
              <p className="text-xs text-gray-500">Actor & Political Leader</p>
            </div>
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg bg-white">
              <img
                src="/lovable-uploads/bba7b4cc-8d6d-4f4c-a623-c76ac3eb28bc.png"
                alt="Jana Sena President"
                className="w-full h-full object-cover object-top"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};