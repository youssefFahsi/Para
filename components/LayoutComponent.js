export default function LayoutComponent({ children, title }) {
  return (
    <div className={`p-1 `}>
      <div className=" shadow-md">
        <div className="text-white bg-[#424242] border-[#ddd] px-1 py-1 leading-5 ">
          <h2 className="font-medium text-sm">{title}</h2>
        </div>
        <div className="px-2 py-1">{children}</div>
      </div>
    </div>
  );
}
