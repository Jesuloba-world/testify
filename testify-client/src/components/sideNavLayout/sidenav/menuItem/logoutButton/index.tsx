import { FC } from "react";
import { IconType } from "react-icons";

interface props {
	name: string;
	Icon: IconType;
}

export const LogOut: FC<props> = ({ name, Icon }) => {
	return (
		<button className="flex px-8 gap-4 items-center py-2 relative hover:bg-quick-silver/50">
			<Icon />
			<p>{name}</p>
		</button>
	);
};
