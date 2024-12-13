export const LeadershipBanner = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-primary">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Chief Minister"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">Hon'ble Chief Minister</p>
              <p className="text-base font-bold text-gray-900">Sri Y.S. Jagan Mohan Reddy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Hon'ble MLA</p>
              <p className="text-base font-bold text-gray-900">Sri K.R.J. Bharat</p>
            </div>
            <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-primary">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="MLA"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};