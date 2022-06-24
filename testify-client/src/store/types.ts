import { ProjectType } from "../generated/graphql";

export interface project extends ProjectType {
	active: boolean;
}
