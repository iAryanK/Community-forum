import Image from "next/image";

const Bg = () => {
  return (
    <div className="absolute fill-black w-full z-[-2] gradient-fade dark:invert dark:opacity-30">
      <Image
        src={"/bg.svg"}
        alt="bg"
        width={1000}
        height={1000}
        className="w-full bg-cover"
      />
    </div>
  );
};

export default Bg;
