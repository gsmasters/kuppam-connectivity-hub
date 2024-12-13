export const LeadershipBanner = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/a42ee3a8-1935-49b6-a93a-0c381891b668.png"
              alt="Chief Minister"
              className="w-16 h-16 object-cover rounded-full border-2 border-primary"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">Hon'ble Chief Minister</p>
              <p className="text-base font-bold text-gray-900">Sri N. Chandrababu Naidu</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Hon'ble MLA</p>
              <p className="text-base font-bold text-gray-900">Sri Pawan Kalyan</p>
            </div>
            <img
              src="/lovable-uploads/bba7b4cc-8d6d-4f4c-a623-c76ac3eb28bc.png"
              alt="MLA"
              className="w-16 h-16 object-cover rounded-full border-2 border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};