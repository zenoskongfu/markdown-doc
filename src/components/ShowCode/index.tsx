import { useEffect, useState } from "react";
import Prism from "prismjs";
import "./index.scss";
import "prismjs/components/prism-typescript";

const ShowCode = (props: { code: string }) => {
  const [newCode, setCode] = useState("");

  useEffect(() => {
    const res = Prism.highlight(
      props.code,
      Prism.languages.typescript,
      "typescript"
    );
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
