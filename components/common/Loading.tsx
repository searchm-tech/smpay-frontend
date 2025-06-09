type LoadingUIProps = {
  title?: string;
};

function LoadingUI({ title = "Loading..." }: LoadingUIProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999]">
      <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <h3 className="text-xl font-semibold mt-4">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default LoadingUI;
