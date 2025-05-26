'use client';

import React from 'react';

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="form-flow-layout">
      {children}
      <style jsx global>{`
        .form-flow-layout {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}