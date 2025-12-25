import { useState } from 'preact/hooks';
import { DEFAULT_THEME_CONFIG } from '@sdk/utils/config';

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

  const allConsentsAccepted = Object.values(consents).every((value) => value === true);

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

  return (
    <div className="sdk-view-consent">
      <div className="flex flex-col gap-6 py-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Consent & Authorization</h2>
          <p className="text-sm text-gray-600">
            Please review and accept the following terms to proceed with identity verification
          </p>
        </div>

        <div
          className="flex flex-col gap-4 p-4 rounded-lg"
          style={{
            background: DEFAULT_THEME_CONFIG.colors.background_secondary,
            border: `1px solid ${DEFAULT_THEME_CONFIG.colors.border_primary}`,
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="dataCollection"
              checked={consents.dataCollection}
              onChange={() => handleConsentChange('dataCollection')}
              className="mt-1"
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="dataCollection"
              className="flex-1 cursor-pointer"
              style={{ color: DEFAULT_THEME_CONFIG.colors.text_primary }}
            >
              <strong>Data Collection Consent</strong>
              <p className="text-sm mt-1" style={{ color: DEFAULT_THEME_CONFIG.colors.text_secondary }}>
                I consent to the collection of my personal information and document data for identity verification purposes.
              </p>
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="dataProcessing"
              checked={consents.dataProcessing}
              onChange={() => handleConsentChange('dataProcessing')}
              className="mt-1"
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="dataProcessing"
              className="flex-1 cursor-pointer"
              style={{ color: DEFAULT_THEME_CONFIG.colors.text_primary }}
            >
              <strong>Data Processing Consent</strong>
              <p className="text-sm mt-1" style={{ color: DEFAULT_THEME_CONFIG.colors.text_secondary }}>
                I authorize the processing of my data using automated systems and AI technologies for verification and fraud prevention.
              </p>
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="biometricData"
              checked={consents.biometricData}
              onChange={() => handleConsentChange('biometricData')}
              className="mt-1"
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="biometricData"
              className="flex-1 cursor-pointer"
              style={{ color: DEFAULT_THEME_CONFIG.colors.text_primary }}
            >
              <strong>Biometric Data Consent</strong>
              <p className="text-sm mt-1" style={{ color: DEFAULT_THEME_CONFIG.colors.text_secondary }}>
                I consent to the capture and processing of my biometric data (facial images) for liveness detection and identity matching.
              </p>
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="termsAndConditions"
              checked={consents.termsAndConditions}
              onChange={() => handleConsentChange('termsAndConditions')}
              className="mt-1"
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="termsAndConditions"
              className="flex-1 cursor-pointer"
              style={{ color: DEFAULT_THEME_CONFIG.colors.text_primary }}
            >
              <strong>Terms & Conditions</strong>
              <p className="text-sm mt-1" style={{ color: DEFAULT_THEME_CONFIG.colors.text_secondary }}>
                I have read and agree to the Terms of Service and Privacy Policy governing this identity verification process.
              </p>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            disabled={!allConsentsAccepted}
            className="btn btn-lg btn-primary"
            style={{
              opacity: allConsentsAccepted ? 1 : 0.5,
              cursor: allConsentsAccepted ? 'pointer' : 'not-allowed',
            }}
          >
            Accept & Continue
          </button>
          {onDecline && (
            <button
              onClick={handleDecline}
              className="btn btn-lg btn-outline"
              style={{
                borderColor: DEFAULT_THEME_CONFIG.colors.border_primary,
                color: DEFAULT_THEME_CONFIG.colors.text_primary,
              }}
            >
              Decline
            </button>
          )}
        </div>

        {!allConsentsAccepted && (
          <p className="text-xs text-center" style={{ color: DEFAULT_THEME_CONFIG.colors.text_secondary }}>
            Please accept all consents to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default Consent;