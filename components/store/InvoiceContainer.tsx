"use client";
import React, { useState } from "react";
import Invoice from "./Invoice";
import CheckoutForm from "./CheckoutForm";
import { useUser } from "@clerk/nextjs";
import { OrderedProducts, Product } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import InvoiceSkeleton from "./InvoiceSkeleton";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";

const InvoiceContainer = ({
  translations,
}: {
  translations: {
    email: string;
    name: string;
    phone: string;
    shippingAddress: string;
    shippingCost: string;
    addl1: string;
    addl2: string;
    city: string;
    state: string;
    pincode: string;
    pay: string;
    currency: string;
    total: string;
    vat: string;
    subTotal: string;
    checkout: string;
  };
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [orderAmount, setOrderAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderedProducts, setOrderedProducts] = useState<OrderedProducts[]>([]);
  return (
    <>
      <div className="w-full max-w-lg">
        <Invoice
          setOrderAmount={setOrderAmount}
          setOrderedProducts={setOrderedProducts}
          setLoading={setLoading}
          translations={{
            total: translations.total,
            pay: translations.pay,
            currency: translations.currency,
            shippingCost: translations.shippingCost,
            vat: translations.vat,
            subTotal: translations.subTotal,
          }}
        />
      </div>
      {loading ? (
        <InvoiceFormSkeleton />
      ) : (
        <div className="my-10 md:mt-0 max-w-xl bg-white p-5 shadow-md">
          <p className="text-lg mb-4">{translations.checkout}</p>
          <CheckoutForm
            email={user?.emailAddresses[0]?.emailAddress || ""}
            fullname={
              user?.firstName ? `${user.firstName} ${user.lastName}` : ""
            }
            phone={user?.phoneNumbers[0]?.phoneNumber || ""}
            orderAmount={orderAmount}
            orderedProducts={orderedProducts}
            translations={translations}
          />
        </div>
      )}
    </>
  );
};

export default InvoiceContainer;
