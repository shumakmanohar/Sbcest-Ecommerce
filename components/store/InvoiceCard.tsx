import { CMS_CONFIG } from "@/cms.config";
import { OrderedProducts, Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const InvoiceCard = ({ product }: { product: OrderedProducts }) => {
  return (
    <div className="flex gap-4 items-center justify-between  w-full max-w-lg">
      {/* Image */}
      <div className="h-14 w-14 rounded-sm  relative">
        <Image
          fill
          className="object-contain"
          src={
            product?.previewImg
              ? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
              : "/sblogo.png"
          }
          alt="Product Image"
        />
      </div>
      {/* Product Name  and Quantity*/}
      <div className="truncate  flex-1">
        <div>
          <p className="text-sm"> {product?.title}</p>
          <p className="text-xs text-muted-foreground">
            Quantity : {product.quantity}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-right">
            Pay {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
