import { FC, ReactNode } from "react";
import { CenterInScreen, Logo } from "..";
import Link from "next/link";
export { AuthButton } from "./AuthButton";
export { AuthInput } from "./AuthInput";

interface props {
	children: ReactNode;
	isLogin?: boolean;
}

export const AuthWrapper: FC<props> = ({ children, isLogin }) => {
	return (
		<CenterInScreen background="grey">
			<div className="w-96 flex flex-col gap-4">
				{/* Form Head */}
				<div className="flex flex-col w-full items-center gap-3">
					<Link href={"/"}>
						<a>
							<Logo small size={5} />
						</a>
					</Link>
					<h3 className="text-2xl font-semibold">
						{isLogin
							? "Sign in to your account"
							: "Create your account"}
					</h3>
				</div>
				{children}
				{/* Redirect Link */}
				{isLogin ? (
					<p>
						Don&#39;t have an account?{" "}
						<Link href={"/signup"}>
							<a className="text-blue-500 hover:text-blue-700 active:text-blue-700">
								<span className="text-sm font-semibold">
									Sign Up Instead
								</span>
							</a>
						</Link>
					</p>
				) : (
					<p>
						Already have an account?{" "}
						<Link href={"/login"}>
							<a className="text-blue-500 hover:text-blue-700 active:text-blue-700">
								<span className="text-sm font-semibold">
									Log in Instead
								</span>
							</a>
						</Link>
					</p>
				)}
			</div>
		</CenterInScreen>
	);
};
