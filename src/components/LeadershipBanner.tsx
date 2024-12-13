export const LeadershipBanner = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/c8094c4f-8fce-4051-bb7b-f3d38178c754.png"
              alt="Chief Minister"
              className="w-16 h-16 object-cover rounded-full border-2 border-primary"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">Hon'ble Chief Minister</p>
              <p className="text-base font-bold text-gray-900">Sri Nara Chandrababu Naidu</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Hon'ble Minister</p>
              <p className="text-base font-bold text-gray-900">Sri Konidala Pawan Kalyan</p>
            </div>
            <img
              src="/lovable-uploads/57f2b1fb-c86c-4452-9a64-3b33aa4298cc.png"
              alt="Minister"
              className="w-16 h-16 object-cover rounded-full border-2 border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};