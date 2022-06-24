import type { NextApiRequest, NextApiResponse } from "next";
import { LoginDocument } from "../../src/generated/graphql";
import { Client } from "../../src/apollo/client";
import Nookies from "nookies";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

type Data = {
	success?: boolean | null;
	error?: any;
	token?: string | null;
	refreshToken?: string | null;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { body, method } = req;

	const { remember } = body;

	if (method !== "POST") {
		res.status(405).end("Method not allowed");
	}

	const { data } = await Client.mutate({
		mutation: LoginDocument,
		variables: body,
	});

	if (data?.login?.errors) {
		const error = data.login.errors[Object.keys(data.login.errors)[0]][0];

		res.status(400).json({
			error: error,
		});
	}

	if (data?.login?.token && data?.login?.refreshToken) {
		Nookies.set({ res }, "access", data?.login?.token, {
			expires: dayjs().add({ minutes: 10 }).toDate(),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
		});

		Nookies.set({ res }, "refresh", `${data?.login?.refreshToken}`, {
			expires: remember && dayjs().add({ day: 30 }).toDate(),
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
		});
	}

	res.status(200).json({
		success: data?.login?.success,
		token: data?.login?.token,
		refreshToken: data?.login?.refreshToken,
	});
}
