import { FC, useState, createContext, ReactElement } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  open: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SidebarProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        toggleSidebar,
        closeSidebar,
        handleDrawerOpen,
        handleDrawerClose,
        open
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
