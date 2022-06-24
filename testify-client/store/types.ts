import { ProjectType } from "../src/generated/graphql";

export interface project extends ProjectType {
	active: boolean;
}
