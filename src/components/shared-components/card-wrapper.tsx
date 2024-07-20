import React from "react";
import SingleCardItem from "./single-card-item";
import { TBook } from "@/types/book";

type Props = {
  product: TBook[];
};

const CardWrapper = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {(product as TBook[]).map((product, index) => (
        <SingleCardItem product={product} key={index} />
      ))}
    </div>
  );
};

export default CardWrapper;
