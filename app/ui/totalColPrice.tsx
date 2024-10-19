export default function TotalColPrice({
  title,
  total,
}: {
  title: string;
  total: number;
}) {
  return (
    <div className="border-[1px] border-orange-500 rounded-[5px] px-[20px] py-[10px] font-bold ">
      <span> {title}: </span>
      <span>{total}</span>
    </div>
  );
}
