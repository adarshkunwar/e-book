import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TBook } from "@/types/book";
import Link from "next/link";

type Props = {
  product: TBook;
};

export default function SingleCardItem({ product }: Props) {
  const upperCaseName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Link href={`/book/${product.id}`}>
      <Card>
        <CardHeader>
          <div className="aspect-[3/4] overflow-clip w-full p-2">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-lg object-cover shadow"
              src={`/uploads/${product.coverImage}`}
              alt={product.title}
            />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-black">{upperCaseName(product.title)}</h3>
          <h3 className="text-sm">{product.author}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
