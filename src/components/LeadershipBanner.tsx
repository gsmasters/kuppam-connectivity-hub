export const LeadershipBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg">
              <img
                src="/lovable-uploads/2e229ff5-9c69-4522-a6c7-5f1489a2e346.png"
                alt="Chief Minister"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">Hon'ble Chief Minister</p>
              <p className="text-base font-bold text-gray-900">Sri Y.S. Jagan Mohan Reddy</p>
              <p className="text-xs text-gray-500">Government of Andhra Pradesh</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Hon'ble MLA</p>
              <p className="text-base font-bold text-gray-900">Sri K.R.J. Bharat</p>
              <p className="text-xs text-gray-500">Kuppam Constituency</p>
            </div>
            <div className="w-24 h-32 overflow-hidden rounded-lg border-2 border-primary shadow-lg">
              <img
                src="/lovable-uploads/fbeccff5-817a-4886-af1f-1637586e1a79.png"
                alt="MLA"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};