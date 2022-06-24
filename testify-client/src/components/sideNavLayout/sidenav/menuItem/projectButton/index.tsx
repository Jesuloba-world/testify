import { FC, useState } from "react";
import { IconType } from "react-icons";
import { MdArrowDropDown } from "react-icons/md";
import { ProjectItem } from "./Project";
import menuStore from "../../../../../store/menu/menuStore";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

interface projectProps {
	selected: boolean;
	Icon: IconType;
	IconFill: IconType;
	name: string;
}

export const Project: FC<projectProps> = observer(
	({ selected, Icon, IconFill, name }) => {
		const show = menuStore.showProjects;

		return (
			<button
				className={`flex flex-col px-8 pr-4 relative ${
					(selected || show) && `bg-cultured-white`
				}`}
			>
				{/* Shown part */}
				<div
					className="flex gap-4 py-2 items-center w-full"
					onClick={() => {
						menuStore.toggleShowProjects();
					}}
				>
					{selected ? (
						<div className="absolute h-6 w-1 bg-rich-black left-0 top-2" />
					) : null}
					{!selected ? <Icon /> : <IconFill />}
					<p>{name}</p>
					<MdArrowDropDown
						className={`text-xl text-rich-black ml-auto -rotate-90 ${
							show && `rotate-0`
						}`}
					/>
				</div>
				{/* Hidden part */}
				{show && (
					<div
						className={`mb-2 ml-2 pl-2 border-l-2 border-quick-silver/40 w-full`}
					>
						{menuStore.projects.map((project) => (
							<ProjectItem key={project.id} {...project} />
						))}
					</div>
				)}
			</button>
		);
	}
);
