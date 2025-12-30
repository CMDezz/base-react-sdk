import { FaIdCard, FaIdBadge, FaPassport, FaAngleRight } from 'react-icons/fa';

const OCRSelector = ({
  onSelection,
}: {
  onSelection: (option: string) => void;
}) => {
  const options = [
    {
      id: 'Identification Card',
      label: 'Identification Card',
      icon: FaIdCard,
      description: 'National ID or government-issued ID',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'Driver License',
      label: 'Driver License',
      icon: FaIdBadge,
      description: 'Valid driver\'s license',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      id: 'Passport',
      label: 'Passport',
      icon: FaPassport,
      description: 'International passport',
      gradient: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold mb-2 text-primary">
          Select Document Type
        </h2>
        <p className="text-sm text-secondary">
          Choose the type of document you want to verify
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 p-6 text-left transition-all duration-300 hover:border-primary hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onSelection(option.id)}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-linear-to-r ${option.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
              
              <div className="relative flex items-center gap-4">
                {/* Icon with gradient background */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-r ${option.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon size={24} />
                </div>
                
                {/* Text content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {option.label}
                  </h3>
                  <p className="mt-1 text-sm text-base-content">
                    {option.description}
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="text-base-content transition-all duration-300 group-hover:translate-x-2 group-hover:text-success">
                  <FaAngleRight size={24}/>
                </div>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OCRSelector;
