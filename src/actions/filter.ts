

import { actionCreatorFactory } from "dva-model-creator";

const actionCreator = actionCreatorFactory("curblrData");

export const time = actionCreator<number>("time");
export const day = actionCreator<number>("day");
export const priority = actionCreator("priority");
export const activity = actionCreator("activity");
export const user = actionCreator("user");