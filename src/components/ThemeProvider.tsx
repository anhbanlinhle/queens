'use client';

import React, { useContext, useState } from 'react';
import { ConfigProvider } from 'antd';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#01d6a8',
        colorPrimaryHover: '#01d6a8',
        colorPrimaryActive: '#01d6a8',
        fontFamily: 'GeistMono',
      },
      components: {
        Button: {
          colorPrimary: '#01d6a8',
          colorPrimaryHover: '#01d6a8',
          colorPrimaryActive: '#01d6a8',
        },
      }
    }}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;