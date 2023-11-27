type Member = {
  id: number;
  name: string;
  img: string;
  position: string;
  major: string;
  team: string;
  status: boolean;
};

type Props = {
  info: Member;
} & React.HTMLAttributes<HTMLImageElement>;

const MemberCard = (props: Props) => {
  const info = props.info;
  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 outline outline-1 outline-primary rounded-sm py-2 px-4">
      <img
        src={info.img}
        alt="person"
        className="rounded-full w-full lg:w-[80px]"
      />
      <div className="flex  justify-between w-full">
        <div className="flex flex-col lg:gap-0 gap-2  justify-start">
          <h2 className="text-xl text-primary font-bold">{info.name}</h2>
          <p>
            <span className="font-bold">{info.position}</span> |{" "}
            <span>{info.major}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="bg-primary rounded-sm text-center text-white px-5">
            {info.team}
          </p>
          <p
            className={`${
              info.status ? "bg-green-400" : "bg-red-400"
            } rounded-sm text-center text-white px-5`}
          >
            {info.status ? "Active" : "Removed"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
