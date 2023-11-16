import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children, ...props }: Props) => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AppLayout;
