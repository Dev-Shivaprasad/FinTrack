import { Margin, usePDF } from "react-to-pdf";
import Button from "../Button";

export default function Downloadtopdf() {
  const { toPDF, targetRef } = usePDF({
    filename: "Transactions(Fintrack).pdf",
    page: { margin: Margin.MEDIUM, orientation: "portrait" },
  });
  return (
    <div>
      {/* <Button action={() => toPDF()} title="Download PDF" />*/}
      <button onClick={() => toPDF()}>Download PDF</button>
      <div ref={targetRef} style={{ width: "Content-fit", backgroundColor: "white" }} className="hidden">
        <p>Hi</p>
      </div>
    </div>
  );
}
