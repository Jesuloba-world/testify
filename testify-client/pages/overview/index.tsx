import type { NextPageWithLayout } from "../../types";
import { GetServerSidePropsContext } from "next";
import { ReactElement, useEffect } from "react";
import { Client } from "../../src/apollo/client";
import { GetProjectsDocument } from "../../src/generated/graphql";
import { observer } from "mobx-react";
import { SideNavLayout } from "../../components";
import { ProjectType } from "../../src/generated/graphql";
import menuStore from "../../store/menu/menuStore";
import { requireAuthentication } from "../../util/checkAuth";

interface props {
	projects: ProjectType[];
}

const Overview: NextPageWithLayout<props> = ({ projects }) => {
	//set projects as menu items
	useEffect(() => {
		menuStore.convertAndSetProjects(projects);
	}, [projects]);

	return <div>This is the overview section</div>;
};

Overview.getLayout = function getLayout(page: ReactElement) {
	return <SideNavLayout>{page}</SideNavLayout>;
};

export default observer(Overview);

export const getServerSideProps = requireAuthentication(
	async (ctx: GetServerSidePropsContext) => {
		// get Projects
		const projects = await Client.query({
			query: GetProjectsDocument,
		});

		return {
			props: {
				projects: projects.data.projects,
			},
		};
	},
	"/"
);
