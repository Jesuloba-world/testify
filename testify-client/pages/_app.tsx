import "../styles/globals.css";
import { AppPropsWithLayout } from "../types";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { Client } from "../src/apollo/client";
import { observer } from "mobx-react";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<>
			<Head>
				<title>Testify: Bug tracker</title>
			</Head>
			<ApolloProvider client={Client}>
				{getLayout(<Component {...pageProps} />)}
			</ApolloProvider>
		</>
	);
}

export default observer(MyApp);
