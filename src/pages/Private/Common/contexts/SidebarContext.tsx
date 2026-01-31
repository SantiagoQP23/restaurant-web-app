import { FC, useState, createContext, ReactElement } from 'react';
type SidebarContext = {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SIDEBAR_STATE_KEY = 'sidebar-toggle-state';

export const SidebarProvider: FC<Props> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    const newState = !sidebarToggle;
    setSidebarToggle(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(newState));
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
    localStorage.setItem(SIDEBAR_STATE_KEY, 'false');
  };

  const openSidebar = () => {
    setSidebarToggle(true);
    localStorage.setItem(SIDEBAR_STATE_KEY, 'true');
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        toggleSidebar,
        closeSidebar,
        openSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
