import DashboardHeader from "@/components/store/DashboardHeader";
import Wrapper from "@/components/store/Wrapper";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import OrderCard from "@/components/store/OrderCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { PaymentStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

const page = async () => {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();
  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
    const user = await currentUser();

    const orders = await prisma.order.findMany({
      where: { userID: userId, paymentStatus: PaymentStatus.SUCCESS },
      orderBy: {
        createdAt: "desc",
      },
    });
    const t = await getTranslations("Dashboard");
    return (
      <div className="min-h-[80vh]">
        <Wrapper>
          <DashboardHeader name={user?.firstName} />
          <Alert className="my-10">
            <Info className="h-4 w-4" />

            <AlertTitle>{t("cs")}</AlertTitle>
            <AlertDescription>
              {t("cs txt")}. <br />
              {t("ln ar")} : {t("ph ar")} <br />
              {t("ln en")} : {t("ph en")}
            </AlertDescription>
          </Alert>
          <div className="p-8 bg-white mb-20">
            <h1 className="text-3xl font-bold mb-6">{t("oh")}</h1>
            <p className="mb-8">{t("oh txt")}.</p>
            {orders.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))}
          </div>
        </Wrapper>
      </div>
    );
  }

  return <div></div>;
};

export default page;
