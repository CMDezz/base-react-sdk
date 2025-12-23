import { Button as BaseButton } from "../ui/button";

function Button(props: React.ComponentProps<typeof BaseButton>) {
  return <BaseButton {...props} />;
}

export default Button;
