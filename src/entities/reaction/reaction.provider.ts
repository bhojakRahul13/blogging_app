import { Reaction } from "./reaction.entity";

export const reactionProviders = [
  { provide: "ReactionRepository", useValue: Reaction },
];
