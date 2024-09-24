import ShowCode from "../ShowCode";
import { useState } from "react";
import "./index.scss";
type Props = {
  children: React.ReactElement;
  code: string;
};

const ComponentAndCode = (props: Props) => {
  const [isShow, setShow] = useState(false);

  return (
    <div className="compo-and-code">
      <div className="compo-container">{props.children}</div>
      <div className="tool-bar" style={{ borderBottomWidth: isShow ? 1 : 0 }}>
        <div onClick={() => setShow(!isShow)}>
          <img src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg" />
        </div>
      </div>
      <div className="code-container" style={{ maxHeight: isShow ? "200px" : 0 }}>
        <ShowCode code={props.code} />
      </div>
    </div>
  );
};

export default ComponentAndCode;
