import { FC } from "react";
import { FaBug } from "react-icons/fa";

export const Logo: FC<{ small?: boolean; size: number }> = ({
	small,
	size,
}) => {
	return (
		<div
			className={`flex gap-4 items-center text-${size}xl text-blue-green font-head`}
		>
			<FaBug />
			{!small && <h1 className="font-bold">testify</h1>}
		</div>
	);
};
