import type React from 'react'

export const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

export const contentStyle: React.CSSProperties = {
  textAlign: "center",
  flex: "1",
  padding: "24px",
  minHeight: "calc(100vh - 128px)",
}

export const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  lineHeight: "64px",
}

export const layoutStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
}