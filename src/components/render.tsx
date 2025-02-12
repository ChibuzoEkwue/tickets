import React from "react";
import { StepsType } from "../steps"
import { useTicketStore } from "@/lib/store";

const Render = ({ steps }: { steps: StepsType[] }) => {
  const { currentPage } = useTicketStore((state) => state);
  

  const step = steps[currentPage];
  const Comp = step.component;
  if (!Comp) return null;

  return <div className="my-5">{Comp && <Comp />}</div>;
};

export default Render;
