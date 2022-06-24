import type { NextPage } from "next";
import { useState } from "react";
import {
	AuthWrapper,
	ErrorBox,
	AuthInput,
	AuthButton,
} from "../src/components";
import { signupFormElements } from "../src/form/elements";
import { signUpSchema } from "../src/form/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { SignUpDocument, MutationRegisterArgs } from "../src/generated/graphql";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

const SignUp: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const [SignUp, { loading }] = useMutation(SignUpDocument, {
		errorPolicy: "none",
		onCompleted(data) {
			if (data.register?.errors) {
				// handle escaped errors
				const errors = data.register?.errors;
				setErrorMessage(errors[Object.keys(errors)[0]][0].message);
				return;
			}
			setErrorMessage("");
			console.log(data);
			router.push("/overview");
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
		resolver: yupResolver(signUpSchema),
	});

	const handleSignup: (data: any) => void = (data) => {
		const param: MutationRegisterArgs = {
			username: data.username,
			email: data.email,
			password1: data.password,
			password2: data.password2,
		};

		SignUp({
			variables: param,
		});
	};

	return (
		<AuthWrapper>
			{/* Form container */}
			<form
				onSubmit={handleSubmit(handleSignup)}
				className="w-full rounded px-4 py-6 shadow-lg bg-white flex flex-col gap-3"
			>
				{/* Error Box */}
				{errorMessage && <ErrorBox error={errorMessage} />}
				{signupFormElements.map((element, index) => (
					<AuthInput
						{...element}
						key={index}
						register={register}
						error={errors}
					/>
				))}
				<div className="flex flex-col items-start">
					{/* Terms and Condition Box */}
					<div className="flex gap-1 items-center cursor-pointer">
						<input
							type="checkbox"
							id="agree"
							className="cursor-pointer"
							{...register("agree")}
						/>
						<label
							htmlFor="agree"
							className="text-sm font-medium cursor-pointer"
						>
							I agree with terms and conditions
						</label>
					</div>
					{errors["agree"] && (
						<p className="text-red-500 text-xs">
							{errors["agree"].message}
						</p>
					)}
				</div>
				<AuthButton loading={loading} />
			</form>
		</AuthWrapper>
	);
};

export default observer(SignUp);
