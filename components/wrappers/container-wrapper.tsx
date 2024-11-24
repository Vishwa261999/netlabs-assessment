import React, { ReactNode } from "react";

const ContainerWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-7xl mx-auto py-10">{children}</div>;
};

export { ContainerWrapper };
