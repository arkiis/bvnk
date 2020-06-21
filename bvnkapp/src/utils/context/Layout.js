import React, { useState, useEffect, useCallback } from "react";
import themeConfig from "../../configs/themeConfig";
import FullLayout from "../../layouts/FullpageLayout";
import PropTypes from "prop-types";
const layouts = {
  full: FullLayout,
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

  const updateWidth = useCallback(() => {
    setLayout({ ...layout, width: window.innerWidth });
  }, [layout]);

  const handleWindowRezise = useCallback(() => {
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
  }, [activeLayout, lastLayout, updateWidth, width]);

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
        horizontalLayout: layouts["horizontal"],
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
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout, ContextLayout };
