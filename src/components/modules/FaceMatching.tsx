interface Props {
  lastMessage: WsResponse | null;
  context: SDKContext;
}
const FaceMatching = (props: Props) => {
  console.log('props', props);
  return <div>FaceMatching</div>;
};

export default FaceMatching;
