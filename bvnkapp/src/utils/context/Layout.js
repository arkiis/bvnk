import React, { useState, useEffect } from "react";
import themeConfig from "../../configs/themeConfig";

const layouts = {
  vertical: VerticalLayout,
  full: FullLayout,
  horizontal: HorizontalLayout,
};

const ContextLayout = React.createContext();

const Layout = ({ children }) => {
  const [layout, setLayout] = useState({
    activeLayout: themeConfig.layout,
    width: window.innerWidth,
    lastLayout: null,
    direction: themeConfig.direction,
  });

  let { width, activeLayout, lastLayout, direction } = layout;
  const updateWidth = () => {
    setLayout({ ...layout, width: window.innerWidth });
  };

  const handleWindowRezise = () => {
    updateWidth();
    if (activeLayout === "horizontal" && width <= 1199) {
      setLayout({
        ...Layout,
        activeLayout: "vertical",
        lastLayout: "horizontal",
      });
    }

    if (lastLayout === "horizontal" && width >= 1199) {
      setLayout({
        activeLayout: "horizontal",
        lastLayout: "vertical",
      });
    }
  };

  useEffect(() => {
    if (window !== "undefined") {
      window.addEventListener("resize", handleWindowRezise);
    }

    if (activeLayout === "horizontal" && width <= 1199) {
      setLayout({
        ...layout,
        activeLayout: "vertical",
      });
    } else if (themeConfig.layout === "horizontal" && width >= 1200) {
      setLayout({
        ...layout,
        activeLayout: "horizontal",
      });
    } else {
      setLayout({
        ...layout,
        activeLayout: "vertical",
      });
    }
  }, []);

  return (
    <ContextLayout.Provider
      value={{
        state: layout,
        fullLayout: layouts["full"],
        verticalLayout: layouts["vertical"],
        HorizontalLayout: layouts["horizontal"],
        switchLayout: (layouts) => {
          setLayout({
            ...layout,
            activeLayout: layouts,
          });
        },
      }}
    >
      {children}
    </ContextLayout.Provider>
  );
};

export { Layout, ContextLayout };
