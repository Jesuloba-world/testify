import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(
	gssp: GetServerSideProps,
	redirectTo: string
) {
	return async (context: GetServerSidePropsContext) => {
		const { req } = context;
		const refresh = req.cookies.refresh;
		const access = req.cookies.access;

		if (!(access || refresh)) {
			// Redirect to a page sent to it
			return {
				redirect: {
					destination: redirectTo,
					statusCode: 302,
				},
			};
		}

		return await gssp(context);
	};
}
