import Button from "./Button";
import Goto from "./utils/GOTO";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-evenly">
      <p className="text-3xl ">The Route you are trying to visit does not exist </p>
      <Button title="Go Home" action={() => Goto({ Link: "/" })} />
    </div>
  );
}
