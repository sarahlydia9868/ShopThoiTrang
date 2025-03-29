interface ITag {
  keyTag: string;
  valueTag: string | number | undefined;
}

export default function Tag({ keyTag, valueTag }: ITag) {
  return (
    <div className="">
      <span className=" font-bold capitalize ">{keyTag}:</span>
      <span className="ml-2 text-sm text-zinc-800 capitalize">{valueTag}</span>
    </div>
  );
}
