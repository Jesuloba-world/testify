import { FC } from "react";
import { VscFile, VscEllipsis } from "react-icons/vsc";
import { project } from "../../../../../../store/types";
import Link from "next/link";

interface props extends project {}

export const ProjectItem: FC<props> = ({ title, active, slug }) => {
	return (
		<Link href={`/project/${slug}`}>
			<a
				className={`flex gap-3 items-center w-full text-lg text-quick-silver px-4 py-1.5  ${
					active ? `bg-rich-black` : `hover:bg-quick-silver/20`
				}`}
			>
				<VscFile />
				<p className="text-xs">{title}</p>
				<VscEllipsis className="ml-auto" />
			</a>
		</Link>
	);
};
