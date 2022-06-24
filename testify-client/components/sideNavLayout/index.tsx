import { FC, ReactNode } from "react";
import { SideNav } from "./sidenav";

interface Props {
	children: ReactNode;
}

export const SideNavLayout: FC<Props> = ({ children }) => {
	return (
		<>
			{/* Page Layout */}
			<div className="h-screen w-screen grid grid-cols-layout">
				<SideNav />
				{children}
			</div>
		</>
	);
};
