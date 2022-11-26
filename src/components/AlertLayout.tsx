interface IAlertLayoutProps {
  content: string;
}

export default function AlertLayout({ content }: IAlertLayoutProps) {
  // One time style so using inline styles
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 48px)",
      }}
    >
      {content}
    </div>
  );
}
