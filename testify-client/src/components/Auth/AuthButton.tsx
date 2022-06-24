import { FC } from "react";
import { RingLoader } from "react-spinners";

export const AuthButton: FC<{ loading: boolean; isLogin?: boolean }> = ({
	loading,
	isLogin,
}) => {
	return (
		<button
			disabled={loading}
			className="relative bg-blue-green text-white rounded h-10 flex items-center justify-center hover:bg-blue-green-dark disabled:cursor-not-allowed"
		>
			<p>{isLogin ? `Sign In` : `Create Account`}</p>
			<div className="absolute right-4">
				<RingLoader
					loading={loading}
					color={"white"}
					css={`
						display: block;
						margin: 0 auto;
					`}
					size={30}
				/>
			</div>
		</button>
	);
};
