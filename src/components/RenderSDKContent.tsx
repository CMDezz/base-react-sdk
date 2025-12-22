import Button from "../base/Button";
import useApiKey from "../hooks/useApiKey";

interface Props {
  context: SDKContext;
  err?: Error;
}
function RenderSDKContent({ context }: Props) {
  const { API_KEY } = useApiKey({
    API_KEY: context.config.core.API_KEY,
  });

  console.log("apiKey ", API_KEY);
  return (
    <div>
      Template
      <Button></Button>
    </div>
  );
}

export default RenderSDKContent;
