//
export type ActionType = "like" | "unlike";
export type LikeServiceType = {
  addLike: (pokemon: string, action: string) => any;
};
export const likeService = () => {
  return {
    addLike: addLike(),
  };
};

// pokemon: string, like: number
const addLike = () => async (pokemon: string, action: string) => {
  const likeNumber = action == "like" ? 1 : 0;
};
