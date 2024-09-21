import "./App.css";
import FooDoc from "./doc/Foo.md";
import FooDocStr from "./doc/Foo.md?raw";
import "../script/markdown/prim-theme";
import markdown2html from "../script/markdown/markdown2html";
import { useEffect, useState } from "react";

function App() {
  const [content, setContent] = useState("");
  // useEffect(() => {
  //   markdown2html(FooDocStr).then((res) => {
  //     setContent(res.value as string);
  //   });
  // }, []);
  return (
    <>
      <FooDoc />
      {/* <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div> */}
    </>
  );
}

export default App;
