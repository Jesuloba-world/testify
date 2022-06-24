import type { NextPageWithLayout } from "../../../types";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import MenuStore from "../../../src/store/menu/menuStore";
import { observer } from "mobx-react";
import { Client } from "../../../src/apollo/client";
import {
	GetProjectsDocument,
	ProjectType,
} from "../../../src/generated/graphql";
import { GetServerSidePropsContext } from "next";
import { SideNavLayout } from "../../../src/components";

interface props {
	projects: ProjectType[];
}

const ProjectPage: NextPageWithLayout<props> = observer(({ projects }) => {
	const router = useRouter();

	const slug = router.query.slug as string;

	useEffect(() => {
		MenuStore.convertAndSetProjects(projects);
		MenuStore.selectProject(slug);

		return () => {
			MenuStore.deactivateAllProjects();
		};
	}, [slug, projects]);

	const project = MenuStore.projects.find((project) => project.slug === slug);

	if (!project) {
		return <div>Project not found</div>;
	}

	return <div>This is the {project.title} section</div>;
});

ProjectPage.getLayout = function getLayout(page: ReactElement) {
	return <SideNavLayout>{page}</SideNavLayout>;
};

export default ProjectPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// get Projects
	const projects = await Client.query({
		query: GetProjectsDocument,
	});

	return {
		props: {
			projects: projects.data.projects,
		},
	};
}
