import { Button } from "../ui/button";

type Props = {};

function BaseButton(props: Props & React.ComponentProps<typeof Button>) {
  return <Button {...props}>{props.children}</Button>;
}

export default BaseButton;
