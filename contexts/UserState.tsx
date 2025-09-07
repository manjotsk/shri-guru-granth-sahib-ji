// create user context

import React, { createContext, useState } from "react";

export const UserContext = createContext<{
  angId: Number;
  setAngId: (id: Number) => void;
} | undefined>(undefined);

const UserState = ({ children }: { children: React.ReactNode }) => {
  const [angId, setAngId] = useState<Number>(1);

  return (
    <UserContext.Provider
      value={{
        angId,
        setAngId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
