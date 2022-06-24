import { FC } from "react";
import { Logo } from "../..";
import { MenuItem } from "./menuItem";
import { useRouter } from "next/router";
import Link from "next/link";
import menuStore from "../../../store/menu/menuStore";
import { observer } from "mobx-react";

export const SideNav: FC = observer(() => {
	const router = useRouter();

	// check if selected
	const pathname = router.pathname;
	menuStore.checkIfSelected(pathname);

	return (
		<nav className="w-full flex flex-col border-r border-gray-400/40">
			{/* Logo Container */}
			<div className="h-32 flex items-center justify-center">
				<Link href="/">
					<a>
						<Logo size={4} />
					</a>
				</Link>
			</div>
			{/* Menu Container */}
			<div className="flex flex-col justify-between h-full pb-10">
				{/* Top Menu section */}
				<div className="flex flex-col">
					{menuStore.TopMenu.map((menu, index) => (
						<MenuItem key={index} {...menu} />
					))}
				</div>
				{/* Bottom Menu Section */}
				<div className="flex flex-col">
					{menuStore.BottomMenu.map((menu, index) => (
						<MenuItem key={index} {...menu} />
					))}
				</div>
			</div>
		</nav>
	);
});
