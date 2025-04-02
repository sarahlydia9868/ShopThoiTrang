interface ISectionHeader {
  text: string;
}

export default function SectionHeader({ text }: ISectionHeader) {
  return (
    <>
      <h1 className="flex justify-start items-start gap-3 text-2xl lg:text-4xl font-bold">{text}</h1>
    </>
  );
}
