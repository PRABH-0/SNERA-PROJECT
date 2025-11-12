using Snera_Core.Entities;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Interface;
using Snera_Core.Interfaces;
using Snera_Core.Models.UserPostModels;
using Snera_Core.UnitOfWork;

namespace Snera_Core.Services
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserPost> _postRepository;
        private readonly IRepository<UserPost_Details> _postDetailsRepository;
        private readonly IRepository<UserPost_Skills> _skillsRepository;
        private readonly IRepository<UserPost_Roles> _rolesRepository;

        public PostService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _userRepository = _unitOfWork.Repository<User>();
            _postRepository = _unitOfWork.Repository<UserPost>();
            _postDetailsRepository = _unitOfWork.Repository<UserPost_Details>();
            _skillsRepository = _unitOfWork.Repository<UserPost_Skills>();
            _rolesRepository = _unitOfWork.Repository<UserPost_Roles>();
        }

        public async Task<string> CreateUserPost(UserPostModel post)
        {
            var user = (await _userRepository.FindAsync(u => u.Id == post.User_Id)).FirstOrDefault();
            if (user == null)
                throw new Exception("User not found.");

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

            await _postRepository.AddAsync(newPost);
            await _postDetailsRepository.AddAsync(postDetails);

            if (post.Skills != null && post.Skills.Any())
            {
                foreach (var skill in post.Skills)
                {
                    var newSkill = new UserPost_Skills
                    {
                        Id = Guid.NewGuid(),
                        Post_Details_Id = postDetails.Id,
                        Skill_Name = skill.Skill_Name,
                        Skill_Type = skill.Skill_Type,
                        Created_At = DateTime.UtcNow,
                        Record_State = "Active"
                    };
                    await _skillsRepository.AddAsync(newSkill);
                }
            }

            if (post.Roles != null && post.Roles.Any())
            {
                foreach (var role in post.Roles)
                {
                    var newRole = new UserPost_Roles
                    {
                        Id = Guid.NewGuid(),
                        Post_Details_Id = postDetails.Id,
                        Role_Name = role.Role_Name,
                        Role_Type = role.Role_Type,
                        Created_At = DateTime.UtcNow,
                        Record_State = "Active"
                    };
                    await _rolesRepository.AddAsync(newRole);
                }
            }

            await _unitOfWork.SaveAllAsync();

            return "Post created successfully with multiple skills and roles!";
        }
    }
}
