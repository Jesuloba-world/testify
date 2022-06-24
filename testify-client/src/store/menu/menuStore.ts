import { makeAutoObservable } from "mobx";
import { MenuItems, menuItem } from "./menu";
import { project } from "../types";
import { ProjectType } from "../../generated/graphql";

class MenuStore {
	TopMenu: menuItem[] = MenuItems.top;
	BottomMenu: menuItem[] = MenuItems.bottom;
	projects: project[] = [];
	showProjects: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setTopMenu(menu: menuItem[]) {
		this.TopMenu = menu;
	}

	selectTopMenuItem = (id: number) => {
		const newItems = this.TopMenu.map((item) => {
			if (item.id === id) {
				return { ...item, selected: true };
			} else {
				return { ...item, selected: false };
			}
		});
		this.setTopMenu(newItems);
	};

	checkIfSelected = (pathname: string) => {
		this.TopMenu.forEach((item) => {
			if (pathname.includes(item.link)) {
				// if link doesn't contain "project" unshow Project
				if (!pathname.includes("project")) {
					this.setShowProjects(false);
				}
				// if already selected do not change
				if (item.selected !== true) {
					this.selectTopMenuItem(item.id);
				}
			}
		});
	};

	setProjects = (projects: project[]) => {
		this.projects = projects;
	};

	convertAndSetProjects = (projects: ProjectType[]) => {
		const allProjects = projects.map((project) => {
			return {
				...project,
				active: false,
			};
		});

		this.setProjects(allProjects);
	};

	setProjectActive = (id: number | string) => {
		const newProjects = this.projects.map((item) => {
			if (item.id === id) {
				return { ...item, active: true };
			} else {
				return { ...item, active: false };
			}
		});
		this.setProjects(newProjects);
	};

	deactivateAllProjects = () => {
		const newProjects = this.projects.map((item) => {
			return { ...item, active: false };
		});
		this.setProjects(newProjects);
	};

	selectProject = (slug: string) => {
		this.projects.forEach((item) => {
			if (item.slug === slug) {
				// if already selected do not change
				if (item.active !== true) {
					this.setProjectActive(item.id);
				}
			}
		});
	};

	setShowProjects = (show: boolean) => {
		this.showProjects = show;
	};

	toggleShowProjects = () => {
		this.setShowProjects(!this.showProjects);
	};
}

const MenuStoreInstance = new MenuStore();

export default MenuStoreInstance;
