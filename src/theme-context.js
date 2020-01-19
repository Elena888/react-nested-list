import React from 'react';

export const showChildren = {
    show: true,
    hide: false,
};

export const ThemeContext = React.createContext(
    showChildren.hide // default value
);