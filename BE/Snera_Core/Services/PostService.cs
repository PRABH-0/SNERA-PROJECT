using Snera_Core.Common;
using Snera_Core.Entities;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Interface;
using Snera_Core.Interfaces;
using Snera_Core.Models;
using Snera_Core.Models.UserPostModels;
using Snera_Core.UnitOfWork;

namespace Snera_Core.Services
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<string> CreatePostComment(PostCommentModel postComment)
        {
            var user = await _unitOfWork.Users.FirstOrDefaultAsync(x => x.Id == postComment.User_Id);
            if (user == null)
            {
                throw new Exception(CommonErrors.UserNotFound);
            }

            var comment = new PostComments()
            {
                Id = Guid.NewGuid(),
                Post_Id = postComment.Post_Id,
                User_Id = postComment.User_Id,
                Comment_Text = postComment.Post_Comment,
                Created_Timestamp = DateTime.UtcNow,
                Last_Edited_By = null,
                Record_State = "Active"
            };

            await _unitOfWork.PostComments.AddAsync(comment);
            await _unitOfWork.SaveAllAsync();

            return "Comment created successfully";
        }

        public async Task<string> CreateUserPost(UserPostDetailsModel post)
        {
            var user = await _unitOfWork.Users.FirstOrDefaultAsync(u => u.Id == post.User_Id);
            if (user == null)
                throw new Exception(CommonErrors.UserNotFound);
            if (post.Title == null)
                throw new Exception(CommonErrors.PostTitleNotNull);
           
            if (post.Description == null)
                throw new Exception(CommonErrors.PostDescriptionNotNull);

            var postId = Guid.NewGuid();

            var newPost = new UserPost
            {
                Id = postId,
                Post_Type = post.Post_Type,
                Title = post.Title,
                Description = post.Description,
                Budget = post.Budget,
                Post_Like = 0,
                Created_Timestamp = DateTime.UtcNow,
                Record_State = "Active",
                User_Id = post.User_Id
            };

            var postDetails = new UserPost_Details
            {
                Id = Guid.NewGuid(),
                UserPost_Id = postId,
                Project_Duration = post.Project_Duration,
                Weekly_Commitment = post.Weekly_Commitment,
                Start_Date = post.Start_Date,
                Requirements = post.Requirements,
                Team_Info = post.Team_Info,
                Team_Size = post.Team_Size,
                Author_Bio = post.Author_Bio,
                Author_Experience = post.Author_Experience,
                Author_Rating = post.Author_Rating,
                Project_Status = post.Project_Status
            };

            try
            {
                await _unitOfWork.UserPosts.AddAsync(newPost);
                await _unitOfWork.UserPostDetails.AddAsync(postDetails);
            }
            catch
            {
                throw new Exception(CommonErrors.PostCreationFailed);
            }

            if (post.Skills != null && post.Skills.Any())
            {
                    List<UserPost_Skills> skills = post.Skills.Select(x => new UserPost_Skills
                    {
                        Id = Guid.NewGuid(),
                        Post_Details_Id = postDetails.Id,
                        Skill_Name = x.Skill_Name,
                        Skill_Type = x.Skill_Type,
                        Created_At = DateTime.UtcNow,
                        Record_State = "Active"
                    }).ToList();

                    if (skills.Any(x => x.Skill_Type != "have"&&x.Skill_Type != "need"))
                        throw new Exception(CommonErrors.PostSkillTypeNotValid);

                    if (skills.Any(x => x.Skill_Type != "need"))
                        throw new Exception(CommonErrors.PostHaveSkillNotNull);

                    if (skills.Any(x => x.Skill_Type != "have"))
                        throw new Exception(CommonErrors.PostHaveSkillNotNull);

                    await _unitOfWork.UserPostSkills.AddRangeAsync(skills);
            }

            if (post.Roles != null && post.Roles.Any())
            {
                try
                {
                    var roles = post.Roles.Select(role => new UserPost_Roles
                    {
                        Id = Guid.NewGuid(),
                        Post_Details_Id = postDetails.Id,
                        Role_Name = role.Role_Name,
                        Role_Type = role.Role_Type,
                        Created_At = DateTime.UtcNow,
                        Record_State = "Active"
                    });

                    await _unitOfWork.UserPostRoles.AddRangeAsync(roles);
                }
                catch
                {
                    throw new Exception(CommonErrors.RoleCreationFailed);
                }
            }

            await _unitOfWork.SaveAllAsync();
            return "Post created successfully with multiple skills and roles!";
        }

        public async Task<List<UserPostModel>> GetAllPostAsync(FilterModel filter, Guid userId)
        {
            var allPosts = await _unitOfWork.UserPosts.GetAllAsync();

            // Apply filters
            if (!string.IsNullOrEmpty(filter.Search))
            {
                allPosts = allPosts.Where(p =>
                    p.Title.Contains(filter.Search, StringComparison.OrdinalIgnoreCase) ||
                    p.Description.Contains(filter.Search, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (!string.IsNullOrEmpty(filter.Type))
            {
                allPosts = allPosts.Where(p => p.Post_Type == filter.Type);
            }

            if (!string.IsNullOrEmpty(filter.State))
            {
                allPosts = allPosts.Where(p => p.Record_State == filter.State);
            }

            // Apply ordering
            allPosts = filter.IsDescending
                ? allPosts.OrderByDescending(p => p.Created_Timestamp)
                : allPosts.OrderBy(p => p.Created_Timestamp);

            // Apply pagination
            var pagedPosts = allPosts
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            var postList = new List<UserPostModel>();

            foreach (var post in pagedPosts)
            {
                var postDetails = await _unitOfWork.UserPostDetails
                    .FirstOrDefaultAsync(d => d.UserPost_Id == post.Id);

                if (postDetails == null)
                    throw new Exception(CommonErrors.PostDetailsNotFound);

                // Get skills
                var skills = await _unitOfWork.UserPostSkills
                    .FindAsync(s => s.Post_Details_Id == postDetails.Id && s.Record_State == "Active");

                var skillList = skills.Select(s => new SkillMode
                {
                    Skill_Name = s.Skill_Name,
                    Skill_Type = s.Skill_Type
                }).ToList();

                var user = await _unitOfWork.Users.FirstOrDefaultAsync(x => x.Id == post.User_Id);
                int postLikesCount = await _unitOfWork.PostLikes.CountAsync(x => x.Post_Id == post.Id);
                int postCommentsCount = await _unitOfWork.PostComments.CountAsync(x => x.Post_Id == post.Id);
                bool userPostLike = await _unitOfWork.PostLikes.AnyAsync(predicate: x => x.User_Id == userId && x.Post_Id == post.Id);

                postList.Add(new UserPostModel
                {
                    Avtar_Name = user.Avtar_Name,
                    Author_Name = user?.FullName ?? string.Empty,
                    Post_Type = post.Post_Type,
                    Title = post.Title,
                    Description = post.Description,
                    Budget = post.Budget,
                    Like_Count = postLikesCount,
                    Comment_Count = postCommentsCount,
                    Is_Like = userPostLike,
                    Created_Timestamp = post.Created_Timestamp,
                    Last_Edited_By = post.Last_Edited_By,
                    Record_State = post.Record_State,
                    User_Id = post.User_Id,
                    Post_Id = post.Id,
                    Skills = skillList
                });
            }

            return postList;
        }

        public async Task<string> UpdatePostLikeAsync(PostLikeModel postLike)
        {
            var existingLike = await _unitOfWork.PostLikes
                .FirstOrDefaultAsync(x => x.User_Id == postLike.User_Id && x.Post_Id == postLike.Post_Id);

            string message;

            if (existingLike != null)
            {
                _unitOfWork.PostLikes.Delete(existingLike);
                message = "Post Disliked";
            }
            else
            {
                var newLike = new PostLikes
                {
                    User_Id = postLike.User_Id,
                    Post_Id = postLike.Post_Id,
                };

                await _unitOfWork.PostLikes.AddAsync(newLike);
                message = "Post Liked";
            }

            await _unitOfWork.SaveAllAsync();
            return message;
        }


        public async Task<PostCommentResultModel> GetPostComments(Guid postId)
        {
            var post = await _unitOfWork.UserPosts.GetByIdAsync(postId);
            if (post == null)
                throw new Exception(CommonErrors.PostNotFound);

            var postComments = (await _unitOfWork.PostComments
                        .FindAsync(x => x.Post_Id == postId))
                        .ToList();

            if (!postComments.Any())
            {
                return new PostCommentResultModel
                {
                    CommentsCount = 0,
                    PostComments = new List<PostCommentResponseModel>()
                };
            }
            var commentsList = new List<PostCommentResponseModel>();

            foreach (var c in postComments)
            {
                var user = await _unitOfWork.Users.GetByIdAsync(c.User_Id);

                commentsList.Add(new PostCommentResponseModel
                {
                    Id = c.Id,
                    Post_Id = c.Post_Id,
                    User_Id = c.User_Id,
                    Comment_Text = c.Comment_Text,
                    Created_Timestamp = c.Created_Timestamp,
                    Avtar_Name = user?.Avtar_Name,
                    Author_Name = user?.FullName
                });
            }

            return new PostCommentResultModel
            {
                CommentsCount = commentsList.Count,
                PostComments = commentsList
            };
        }

        public async Task<PostLikeResponseModel> GetPostLikes(Guid postId)
        {
            UserPost post = await _unitOfWork.UserPosts.GetByIdAsync(postId);
            if (post == null)
                throw new Exception(CommonErrors.PostNotFound);
            int postLikesCount = await _unitOfWork.PostLikes.CountAsync(x => x.Post_Id == postId);
            PostLikeResponseModel result = new PostLikeResponseModel()
            {
                PostLikes = postLikesCount,
            };
            return result;
        }
    }
}
