import API from "./api";

const postApi = {
    getAll: (data: any) => API.post("/Project/GetAllProject", data),

    create: (data: any) => API.post("/Project/CreatePost", data),

    updateLike: (data: any) => API.post("/Project/LikeProjectPost", data),

    createComment: (
        { userId, projectId, comment }:
            { userId: string; projectId: string | number; comment: string }
    ) =>
        API.post("/Project/CommentOnProject", null, {
            params: { userId, projectId, comment }
        }),


    getComments: (projectId: string, role: string) =>
        API.get("/Project/GetProject", {
            params: {
                projectId: projectId,
                role:"admin",
            }
        }),


};

export default postApi;
