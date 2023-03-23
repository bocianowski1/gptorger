interface Props {
  message: string;
  success: boolean;
}

export default function Alert({ message, success }: Props) {
  return (
    <div className="">
      <h4>Alert</h4>
      <h5>{message}</h5>
    </div>
  );
}
