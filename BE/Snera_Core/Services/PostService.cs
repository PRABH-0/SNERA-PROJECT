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
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserPost> _postRepository;
        private readonly IRepository<PostLikes> _postLikesRepository;
        private readonly IRepository<UserPost_Details> _postDetailsRepository;
        private readonly IRepository<UserPost_Skills> _skillsRepository;
        private readonly IRepository<UserPost_Roles> _rolesRepository;

        public PostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _postLikesRepository = _unitOfWork.Repository<PostLikes>();
            _userRepository = _unitOfWork.Repository<User>();
            _postRepository = _unitOfWork.Repository<UserPost>();
            _postDetailsRepository = _unitOfWork.Repository<UserPost_Details>();
            _skillsRepository = _unitOfWork.Repository<UserPost_Skills>();
            _rolesRepository = _unitOfWork.Repository<UserPost_Roles>();
        }

        public async Task<string> CreateUserPost(UserPostDetailsModel post)
        {
            var user = (await _userRepository.FindAsync(u => u.Id == post.User_Id)).FirstOrDefault();
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
                await _postRepository.AddAsync(newPost);
                await _postDetailsRepository.AddAsync(postDetails);
            }
            catch
            {
                throw new Exception(CommonErrors.PostCreationFailed);
            }

            if (post.Skills != null && post.Skills.Any())
            {
                try
                {
                    foreach (var skill in post.Skills)
                    {
                        await _skillsRepository.AddAsync(new UserPost_Skills
                        {
                            Id = Guid.NewGuid(),
                            Post_Details_Id = postDetails.Id,
                            Skill_Name = skill.Skill_Name,
                            Skill_Type = skill.Skill_Type,
                            Created_At = DateTime.UtcNow,
                            Record_State = "Active"
                        });
                    }
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
                    foreach (var role in post.Roles)
                    {
                        await _rolesRepository.AddAsync(new UserPost_Roles
                        {
                            Id = Guid.NewGuid(),
                            Post_Details_Id = postDetails.Id,
                            Role_Name = role.Role_Name,
                            Role_Type = role.Role_Type,
                            Created_At = DateTime.UtcNow,
                            Record_State = "Active"
                        });
                    }
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
            IEnumerable<UserPost> allPosts = await _postRepository.GetAllAsync();

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

            if (filter.IsDescending)
                allPosts = allPosts.OrderByDescending(p => p.Created_Timestamp);
            else
                allPosts = allPosts.OrderBy(p => p.Created_Timestamp);

            var pagedPosts = allPosts
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            List<UserPostModel> postList = new List<UserPostModel>();

            foreach (var post in pagedPosts)
            {
                var postDetails = (await _postDetailsRepository
                    .FindAsync(d => d.UserPost_Id == post.Id))
                    .FirstOrDefault();

                if (postDetails == null)
                    throw new Exception(CommonErrors.PostDetailsNotFound);

                List<SkillMode> skillList = new List<SkillMode>();

                var skills = await _skillsRepository.FindAsync(s =>
                    s.Post_Details_Id == postDetails.Id &&
                    s.Record_State == "Active"
                );

                skillList = skills.Select(s => new SkillMode
                {
                    Skill_Name = s.Skill_Name,
                    Skill_Type = s.Skill_Type
                }).ToList();

                var user = (await _unitOfWork.Users.FindAsync(x => x.Id == post.User_Id)).FirstOrDefault();

                string avatarName = "";

                if (user != null && !string.IsNullOrWhiteSpace(user.FullName))
                {
                    var parts = user.FullName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                    avatarName = parts.Length == 1
                        ? parts[0].Substring(0, Math.Min(2, parts[0].Length)).ToUpper()
                        : $"{parts.First()[0]}{parts.Last()[0]}".ToUpper();
                }

                postList.Add(new UserPostModel
                {
                    Avtar_Name = avatarName,
                    Author_Name = user.FullName,
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
            var existingLike = (await _postLikesRepository
                                .FindAsync(x => x.User_Id == postLike.User_Id
                                             && x.Post_Id == postLike.Post_Id))
                                .FirstOrDefault();

            string message;

            if (existingLike != null)
            {
                _postLikesRepository.Delete(existingLike);
                message = "Post Disliked";
            }
            else
            {
                var newLike = new PostLikes
                {
                    User_Id = postLike.User_Id,
                    Post_Id = postLike.Post_Id,
                };

                await _postLikesRepository.AddAsync(newLike);
                message = "Post Liked";
            }

            await _unitOfWork.SaveAllAsync();

            return message;
        }


    }
}
