import React from "react";

function ErrorMessage({
  content,
  shouldShow = false,
}: {
  content?: string;
  shouldShow: boolean;
}) {
  return <div className="text-error">{shouldShow ? content : ""}</div>;
}

export default ErrorMessage;
