import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
	uri: "http://localhost:8000/graphql/",
	credentials: "include",
});

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		console.log(graphQLErrors);

		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				switch (err.extensions.code) {
					case "UNAUTHENTICATED":
						// Modify the operation context with a new token
						// Make a request for a new token
						return forward(operation);
				}
			}
		}

		return forward(operation);
	}
);

export const Client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
