import { createContext, useContext, ReactNode, useState } from 'react';

const AppContext = createContext("");
type Props = {
    children?: ReactNode;
};

let sharedState = "";

export function AppWrapper( { children }: Props ) {
//   const [context, setContext] = useState("ini id");
  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

export function setContext(id: string) {
  sharedState = id;
}
