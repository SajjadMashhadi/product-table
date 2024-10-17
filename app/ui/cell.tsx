import clsx from "clsx";

export default function Cell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "h-[200px] text-center flex justify-center items-center border-[0.5px] border-orange-200 bg-gray-50 w-[300px] text-[12px] ",
        className
      )}
    >
      {children}
    </div>
  );
}
