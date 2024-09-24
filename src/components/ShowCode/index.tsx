import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "./index.scss";

const ShowCode = (props: { code: string }) => {
  const [newCode, setCode] = useState("");

  useEffect(() => {
    console.log(props.code);
    const res = Prism.highlight(props.code, Prism.languages.typescript, "typescript");
    setCode(res);
  }, [props.code]);

  return (
    <div
      className="show-code-container"
      dangerouslySetInnerHTML={{
        __html: newCode,
      }}
    ></div>
  );
};

export default ShowCode;
