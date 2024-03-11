import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const localActive = useLocale();

	const onSelectChange = (nextLocale: string) => {
		startTransition(() => {
			router.replace(`/${nextLocale}`);
		});
	};
	return (
		<Sheet>
			<SheetTrigger className="flex gap-2">
				<Globe className="text-gray-800" />
				{localActive}
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Select your preferred language</SheetTitle>
					<SheetDescription>You are in Saudi Online Store</SheetDescription>
				</SheetHeader>
				<div className="mt-10">
					<Select onValueChange={onSelectChange} defaultValue={localActive}>
						<SelectTrigger id="language" disabled={isPending}>
							<SelectValue placeholder="English" />
						</SelectTrigger>
						<SelectContent position="popper">
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="ar">العربية</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-gray-600 font-bold mt-5">
						Your shopping cart will not be emptied when you change the store
						language.
					</p>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default LanguageSwitcher;
{
	/* <Select>
								<SelectTrigger
									id="language"
									onChange={onSelectChange}
									disabled={isPending}
								>
									<SelectValue placeholder="English" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="english">English</SelectItem>
									<SelectItem value="arabic">العربية</SelectItem>
								</SelectContent>
							</Select> */
}
{
	/* <div className="mt-6">
								<h2 className="text-sm font-medium">
									You're in the Saudi Arabia online store
								</h2>

								<p className="text-xs text-gray-600 mt-2 font-bold">
									Your shopping cart will not be emptied when you change the
									store language . Translation wont be applied for ordered
									products in checkout/dashboard page
								</p>
							</div> */
}
