export default function PlayerCard() {
  return (
    <div className="relative">
      {/* Front Card */}
      <div className="absolute w-[40px] min-h-[70px] bg-gray-200 rounded-lg hover:bg-gray-300 transition-all ease-linear duration-700 cursor-pointer " />

      {/* Back Card */}
      <div className="w-[40px] min-h-[70px] bg-gray-200 rounded-lg hover:bg-gray-300 transition-all ease-linear duration-700 cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" />
    </div>
  );
}
