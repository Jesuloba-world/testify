import { FC, ReactNode } from "react";

interface props {
	children: ReactNode;
	background?: "grey";
}

export const CenterInScreen: FC<props> = ({ children, background }) => (
	<div
		className={`min-h-screen h-full w-screen grid place-items-center ${
			background === "grey" ? "bg-cultured-white" : "bg-white"
		}`}
	>
		{children}
	</div>
);
