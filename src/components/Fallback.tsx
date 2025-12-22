import { SDKError } from "../utils/errors";

type Props = {
  context: SDKContext;
  err?: SDKError;
};

function Fallback({ err }: Props) {
  console.log(err?.message);
  console.log(err?.name);
  console.log(err?.recoverable);

  return (
    <div>
      <p>You encouter an error </p>
      <p>{err?.message}</p>
      <p>{err?.name}</p>
      <p>Recoverable ?{err?.recoverable}</p>
    </div>
  );
}

export default Fallback;
