import type { NextApiRequest, NextApiResponse } from "next";
import { SignUpDocument } from "../../src/generated/graphql";
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

	if (method !== "POST") {
		res.status(405).end("Method not allowed");
	}

	const { data } = await Client.mutate({
		mutation: SignUpDocument,
		variables: body,
	});

	if (data?.register?.errors) {
		const error =
			data.register.errors[Object.keys(data.register.errors)[0]][0];

		res.status(400).json({
			error: error,
		});
	}

	Nookies.set({ res }, "access", `${data?.register?.token}`, {
		expires: dayjs().add({ minutes: 10 }).toDate(),
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
	});

	Nookies.set({ res }, "refresh", `${data?.register?.refreshToken}`, {
		expires: dayjs().add({ day: 30 }).toDate(),
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
	});

	res.status(200).json({
		success: data?.register?.success,
		token: data?.register?.token,
		refreshToken: data?.register?.refreshToken,
	});
}
