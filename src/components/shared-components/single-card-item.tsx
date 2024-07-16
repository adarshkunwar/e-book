import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TBook } from "@/types/book";

type Props = {
  product: TBook;
};
export default function SingleCardItem({ product }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="aspect-square overflow-clip w-full">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full rounded-lg object-cover"
            src={product.cover}
            alt={product.title}
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-sm">{product.genres.join(",")}</h2>
        <hr />
        <h3>{product.title}</h3>
        <h3>{product.author}</h3>
      </CardContent>
    </Card>
  );
}
