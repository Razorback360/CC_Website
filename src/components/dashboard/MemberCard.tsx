const MemberCard = () => {
  return (
    <div className="flex items-center gap-2 outline outline-1 outline-primary rounded-sm py-2 px-4">
      <img
        src="/profilePic.png"
        alt="person"
        className="rounded-full h-[80px]"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-0 justify-start">
          <h2 className="text-xl text-primary font-bold">Folan Ibn Folan</h2>
          <p>
            <span className="font-bold">Leader</span> | <span>COE</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="bg-red-400 rounded-sm text-center text-white px-5">
            Tech Web
          </p>
          <p className="bg-green-400 rounded-sm text-center text-white px-5">
            Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
