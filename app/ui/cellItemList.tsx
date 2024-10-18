export default function CellItemList({
  tag,
  text,
}: {
  tag: string;
  text: string;
}) {
  return (
    <div className="flex flex-row  w-[70%] justify-between">
      <div className="text-gray-500">{tag}:</div>
      <div className="text-black">{text}</div>
    </div>
  );
}
