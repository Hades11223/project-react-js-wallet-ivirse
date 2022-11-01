import React, { memo, useEffect } from "react";
import "./styled.scss";
function Galaxy() {
  useEffect(async () => {
    await import("./galaxy");
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
      {/* <button
        id="mouse-control-control"
        data-on="UI: On"
        data-off="UI: Off"
      ></button> */}
    </>
  );
}

export default memo(Galaxy);
