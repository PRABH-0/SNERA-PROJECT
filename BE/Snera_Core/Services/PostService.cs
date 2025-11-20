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

            await _unitOfWork.Repository<PostComments>().AddAsync(comment);
            await _unitOfWork.SaveAllAsync();

            return "Comment created successfully";
        }

        public async Task<string> CreateUserPost(UserPostDetailsModel post)
        {
            var user = await _unitOfWork.Users.FirstOrDefaultAsync(u => u.Id == post.User_Id);
            if (user == null)
                throw new Exception(CommonErrors.UserNotFound);

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
                await _unitOfWork.Repository<UserPost>().AddAsync(newPost);
                await _unitOfWork.Repository<UserPost_Details>().AddAsync(postDetails);
            }
            catch
            {
                throw new Exception(CommonErrors.PostCreationFailed);
            }

            if (post.Skills != null && post.Skills.Any())
            {
                try
                {
                    var skills = post.Skills.Select(skill => new UserPost_Skills
                    {
                        Id = Guid.NewGuid(),
                        Post_Details_Id = postDetails.Id,
                        Skill_Name = skill.Skill_Name,
                        Skill_Type = skill.Skill_Type,
                        Created_At = DateTime.UtcNow,
                        Record_State = "Active"
                    });

                    await _unitOfWork.Repository<UserPost_Skills>().AddRangeAsync(skills);
                }
                catch
                {
                    throw new Exception(CommonErrors.SkillCreationFailed);
                }
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

                    await _unitOfWork.Repository<UserPost_Roles>().AddRangeAsync(roles);
                }
                catch
                {
                    throw new Exception(CommonErrors.RoleCreationFailed);
                }
            }

            await _unitOfWork.SaveAllAsync();
            return "Post created successfully with multiple skills and roles!";
        }

        public async Task<List<UserPostModel>> GetAllPostAsync(FilterModel filter)
        {
            var allPosts = await _unitOfWork.Repository<UserPost>().GetAllAsync();

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
                var postDetails = await _unitOfWork.Repository<UserPost_Details>()
                    .FirstOrDefaultAsync(d => d.UserPost_Id == post.Id);

                if (postDetails == null)
                    throw new Exception(CommonErrors.PostDetailsNotFound);

                // Get skills
                var skills = await _unitOfWork.Repository<UserPost_Skills>()
                    .FindAsync(s => s.Post_Details_Id == postDetails.Id && s.Record_State == "Active");

                var skillList = skills.Select(s => new SkillMode
                {
                    Skill_Name = s.Skill_Name,
                    Skill_Type = s.Skill_Type
                }).ToList();

                // Get user info
                var user = await _unitOfWork.Users.FirstOrDefaultAsync(x => x.Id == post.User_Id);
                var avatarName = GenerateAvatarName(user?.FullName);

                postList.Add(new UserPostModel
                {
                    Avtar_Name = avatarName,
                    Author_Name = user?.FullName ?? string.Empty,
                    Post_Type = post.Post_Type,
                    Title = post.Title,
                    Description = post.Description,
                    Budget = post.Budget,
                    Post_Like = post.Post_Like,
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
            var existingLike = await _unitOfWork.Repository<PostLikes>()
                .FirstOrDefaultAsync(x => x.User_Id == postLike.User_Id && x.Post_Id == postLike.Post_Id);

            string message;

            if (existingLike != null)
            {
                _unitOfWork.Repository<PostLikes>().Delete(existingLike);
                message = "Post Disliked";
            }
            else
            {
                var newLike = new PostLikes
                {
                    User_Id = postLike.User_Id,
                    Post_Id = postLike.Post_Id,
                };

                await _unitOfWork.Repository<PostLikes>().AddAsync(newLike);
                message = "Post Liked";
            }

            await _unitOfWork.SaveAllAsync();
            return message;
        }

        private static string GenerateAvatarName(string fullName)
        {
            if (string.IsNullOrWhiteSpace(fullName))
                return string.Empty;

            var parts = fullName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            return parts.Length == 1
                ? parts[0].Substring(0, Math.Min(2, parts[0].Length)).ToUpper()
                : $"{parts.First()[0]}{parts.Last()[0]}".ToUpper();
        }
    }
}