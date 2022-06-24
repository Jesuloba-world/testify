import { FC } from "react";
import { menuItem } from "../../../../store/menu/menu";
import Link from "next/link";
import { Project } from "./projectButton";
import { LogOut } from "./logoutButton";

export interface props extends menuItem {}

export const MenuItem: FC<props> = ({
	name,
	Icon,
	IconFill,
	selected,
	link,
	show,
}) => {
	let component;

	switch (link) {
		case "project":
			component = (
				<Project
					selected={selected}
					Icon={Icon}
					IconFill={IconFill}
					name={name}
				/>
			);
			break;
		case "logout":
			component = <LogOut Icon={Icon} name={name} />;
			break;
		default:
			component = (
				<Link href={`/${link}`}>
					<a
						className={`flex px-8 gap-4 items-center py-2 relative hover:bg-quick-silver/50 ${
							selected && `bg-cultured-white`
						}`}
					>
						{selected ? (
							<div className="absolute h-6 w-1 bg-rich-black left-0 top-2" />
						) : null}
						{!selected ? <Icon /> : <IconFill />}
						<p>{name}</p>
					</a>
				</Link>
			);
	}

	return show ? component : null;
};
