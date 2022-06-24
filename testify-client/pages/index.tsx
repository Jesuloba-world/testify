import type { NextPage } from "next";
import Router from "next/router";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col items-center w-screen">
			<h1 className="text-5xl">This is the landing page</h1>
			<button
				className="mt-6 border-gray-500 border border-solid px-2 py-1 rounded transition duration-150 hover:bg-rich-black hover:text-white"
				onClick={() => {
					Router.push("/login");
				}}
			>
				Start App
			</button>
		</div>
	);
};

export default Home;
