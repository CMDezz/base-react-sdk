import { useState } from 'preact/hooks';
import {
  FaShieldAlt,
  FaDatabase,
  FaFingerprint,
  FaFileContract,
  FaArrowRight,
} from 'react-icons/fa';

interface ConsentProps {
  onAccept: () => void;
  onDecline?: () => void;
}

const Consent = ({ onAccept, onDecline }: ConsentProps) => {
  const [consents, setConsents] = useState({
    dataCollection: false,
    dataProcessing: false,
    biometricData: false,
    termsAndConditions: false,
  });

  const allConsentsAccepted = Object.values(consents).every(
    (value) => value === true
  );

  const handleConsentChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAccept = () => {
    if (allConsentsAccepted) {
      onAccept();
    }
  };

  const handleDecline = () => {
    if (onDecline) {
      onDecline();
    }
  };

  const consentItems = [
    {
      key: 'dataCollection' as const,
      icon: FaDatabase,
      title: 'Data Collection Consent',
      description:
        'I consent to the collection of my personal information and document data for identity verification purposes.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'dataProcessing' as const,
      icon: FaShieldAlt,
      title: 'Data Processing Consent',
      description:
        'I authorize the processing of my data using automated systems and AI technologies for verification and fraud prevention.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      key: 'biometricData' as const,
      icon: FaFingerprint,
      title: 'Biometric Data Consent',
      description:
        'I consent to the capture and processing of my biometric data (facial images) for liveness detection and identity matching.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      key: 'termsAndConditions' as const,
      icon: FaFileContract,
      title: 'Terms & Conditions',
      description:
        'I have read and agree to the Terms of Service and Privacy Policy governing this identity verification process.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="sdk-view-consent">
      <div className="flex flex-col gap-6 py-4">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
              <FaShieldAlt size={25} color="#FFFFFF" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-primary">
            Consent & Authorization
          </h2>
          <p className="text-sm text-gray-600">
            Please review and accept the following terms to proceed with
            identity verification
          </p>
        </div>
        <div
          className="flex flex-col border-primary gap-4 p-4 rounded-2xl shadow-lg border-2 transition-all duration-300"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {consentItems.map((item, index) => {
            const Icon = item.icon;
            const isChecked = consents[item.key];

            return (
              <div
                key={item.key}
                className={`group relative rounded-xl border-2 p-4 transition-all duration-300 ${
                  isChecked
                    ? 'border-primary bg-green-50 shadow-md'
                    : 'border-gray-200'
                }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      id={item.key}
                      checked={isChecked}
                      onChange={() => handleConsentChange(item.key)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={item.key}
                      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ${
                        isChecked
                          ? `bg-linear-to-r ${item.gradient} shadow-lg scale-110`
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}
                    >
                      <Icon color="#FFFFFF" />
                    </label>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 pt-1">
                    <label htmlFor={item.key} className="cursor-pointer">
                      <h3
                        className={'text-base font-semibold mb-1 transition-colors duration-300'}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            disabled={!allConsentsAccepted}
            className={`group relative overflow-hidden rounded-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ${
              allConsentsAccepted
                ? 'bg-primary shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {allConsentsAccepted && (
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            )}
            <span className="relative flex items-center justify-center gap-2">
              Accept & Continue
              <FaArrowRight />
            </span>
          </button>

          {onDecline && (
            <button
              onClick={handleDecline}
              className="rounded-xl cursor-pointer border-2 border-gray-200 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300"
            >
              Decline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consent;
