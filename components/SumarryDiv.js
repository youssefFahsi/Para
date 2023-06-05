import React from "react";

const SummaryCard = ({ title, total }) => {
  return (
    <div className="bg-white rounded-sm p-1 shadow flex justify-center items-center gap-2">
      <h3 className="text-xs font-medium">{title} :</h3>
      <p className="text-sm font-bold">{total.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</p>
    </div>
  );
};

const SummaryDiv = ({data}) => {
 

  return (
    <div className="flex justify-center items-center gap-4 py-1 px-2 border ">
      {data?.map((data, index) => (
        <SummaryCard key={index} title={data.title} total={data.total} />
      ))}
    </div>
  );
};

export default SummaryDiv;