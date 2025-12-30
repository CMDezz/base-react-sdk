import '@shared/styles/index.css';

import SDKContent from './SDKContent';
import SDKErrorFallback from './SDKErrorFallback';
import { SDKError } from '@sdk/utils/errors';
import { ThemeSync } from './ThemeSync';

interface Props {
  context: SDKContext;
  err?: SDKError;
}
function SDKControl({ context, err }: Props) {
  if (err) {
    return <SDKErrorFallback context={context} err={err} />;
  }
  return (
    <>
      <ThemeSync />
      <SDKContent context={context} err={err} />
    </>
  );
}

export default SDKControl;
