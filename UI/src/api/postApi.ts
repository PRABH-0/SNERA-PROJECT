import API from "./api";

const postApi = {
    getAll: (params: any) => API.get("/Project/GetProject", { params }),

    create: (data: any) => API.post("/Project/CreatePost", data),

    updateLike: (data: any) => API.post("/Project/LikeProjectPost", data),

    createComment: (data: any) => API.post("/Project/CommentOnProject", data),

    getComments: (data: any) =>API.get(`/Project/GetProject`, data),

    getLikes: (data:any) =>API.get(`/Project/GetProject`, data),
};

export default postApi;
