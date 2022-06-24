import { IconType } from "react-icons";
import {
	MdOutlineDashboardCustomize,
	MdDashboardCustomize,
	MdLogout,
} from "react-icons/md";
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsChatTextFill,
	BsChatText,
} from "react-icons/bs";
import {
	RiRocketLine,
	RiRocketFill,
	RiBugFill,
	RiBugLine,
	RiSettings4Fill,
	RiSettings4Line,
} from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";

export interface menuItem {
	id: number;
	name: string;
	Icon: IconType;
	IconFill: IconType;
	show: boolean;
	selected: boolean;
	unseen?: number;
	link: string;
}

export const MenuItems: { top: menuItem[]; bottom: menuItem[] } = {
	top: [
		{
			id: 1,
			name: "Overview",
			Icon: MdOutlineDashboardCustomize,
			IconFill: MdDashboardCustomize,
			selected: false,
			show: true,
			link: "overview",
		},
		{
			id: 2,
			name: "Projects",
			Icon: BsLightningCharge,
			IconFill: BsLightningChargeFill,
			selected: true,
			show: true,
			link: "project",
		},
		{
			id: 3,
			name: "Releases",
			Icon: RiRocketLine,
			IconFill: RiRocketFill,
			selected: false,
			show: false,
			link: "releases",
		},
		{
			id: 4,
			name: "Reports",
			Icon: RiBugLine,
			IconFill: RiBugFill,
			selected: false,
			show: false,
			link: "reports",
		},
		{
			id: 5,
			name: "Messages",
			Icon: BsChatText,
			IconFill: BsChatTextFill,
			selected: false,
			show: false,
			link: "messages",
		},
		{
			id: 6,
			name: "Settings",
			Icon: RiSettings4Line,
			IconFill: RiSettings4Fill,
			selected: false,
			show: false,
			link: "settings",
		},
	],
	bottom: [
		{
			id: 7,
			name: "Porfolio",
			Icon: CgWebsite,
			IconFill: CgWebsite,
			selected: false,
			show: false,
			link: "portfolio",
		},
		{
			id: 8,
			name: "Logout",
			Icon: MdLogout,
			IconFill: MdLogout,
			selected: false,
			show: true,
			link: "logout",
		},
	],
};
