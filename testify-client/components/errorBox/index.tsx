import { FC } from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorBoxProps {
	error: string;
}

export const ErrorBox: FC<ErrorBoxProps> = ({ error }) => {
	return (
		<div className="w-full flex gap-4 items-center py-2 px-4 border border-red-700 bg-red-700/30 rounded">
			<MdErrorOutline className="text-2xl" />
			<p className="text-sm">{error}</p>
		</div>
	);
};
