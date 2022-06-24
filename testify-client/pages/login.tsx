import type { NextPage } from "next";
import { useState } from "react";
import { AuthInput, AuthWrapper, AuthButton, ErrorBox } from "../components";
import { loginFormElements } from "../src/form/elements";
import Link from "next/link";
import { loginSchema } from "../src/form/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MutationLoginArgs } from "../src/generated/graphql";
import { checkIsEmail } from "../src/form/util";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../src/generated/graphql";
import { RiContactsBookLine } from "react-icons/ri";

interface paramType extends MutationLoginArgs {
	remember: boolean;
}

const Login: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const [login, { loading }] = useMutation(LoginDocument, {
		errorPolicy: "none",
		onCompleted(data) {
			if (data.login?.errors) {
				// handle escaped errors
				const errors = data.login?.errors;
				setErrorMessage(errors[Object.keys(errors)[0]][0].message);
				return;
			}
			setErrorMessage("");
			console.log(data);
			// route to overview page
		},
		onError(error) {
			if (error.networkError) {
				setErrorMessage("Network Error!!");
			}
			console.log(error.message);
			console.log(error.graphQLErrors);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const handleLogin: (data: any) => void = (data) => {
		const id: string = data.id;
		const isEmail = checkIsEmail(id);

		let param: paramType;

		if (isEmail) {
			param = {
				email: id,
				password: data.password,
				remember: data.remember,
			};
		} else {
			param = {
				username: id,
				password: data.password,
				remember: data.remember,
			};
		}

		// set remember to localStorage
		if (data.remember) {
			localStorage.setItem("remember", "true");
		}

		login({
			variables: param,
		});
	};

	// TODO: handle token expiration
	// TODO: handle redirection to dashboard when login is complete
	// TODO: implement protected routes

	return (
		<AuthWrapper isLogin>
			{/* Form container */}
			<form
				onSubmit={handleSubmit(handleLogin)}
				className="w-full rounded px-4 py-6 shadow-lg bg-white flex flex-col gap-3"
			>
				{/* Errorbox */}
				{errorMessage && <ErrorBox error={errorMessage} />}
				{loginFormElements.map((element, index) => (
					<AuthInput
						{...element}
						key={index}
						register={register}
						error={errors}
					/>
				))}
				<div className="flex justify-between items-center">
					{/* Remember Checkbox */}
					<div className="flex gap-1 items-center cursor-pointer">
						<input
							type="checkbox"
							id="remember"
							className="cursor-pointer"
							{...register("remember")}
						/>
						<label
							htmlFor="remember"
							className="text-sm font-medium cursor-pointer"
						>
							Remember me
						</label>
					</div>
					{/* Forget password Link */}
					<Link href={"/forget-password"}>
						<a className="text-blue-500 hover:text-blue-700 active:text-blue-700">
							<p className="text-sm font-semibold">
								Forgot password?
							</p>
						</a>
					</Link>
				</div>
				<AuthButton loading={loading} isLogin />
			</form>
		</AuthWrapper>
	);
};

export default observer(Login);
