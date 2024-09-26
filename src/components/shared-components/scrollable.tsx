const Scrollable = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-scroll w-full h-full">{children}</div>;
};

export default Scrollable;
