import SDKContent from "./SDKContent";
import SDKErrorFallback from "./SDKErrorFallback";
import { SDKError } from "@sdk/utils/errors";

interface Props {
  context: SDKContext;
  err?: SDKError;
}
function SDKControl({ context, err }: Props) {
  if (err) {
    return <SDKErrorFallback context={context} err={err} />;
  }
  return <SDKContent context={context} err={err} />;
}

export default SDKControl;
