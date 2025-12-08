using Microsoft.AspNetCore.Identity;
using Snera_Core.Common;
using Snera_Core.Entities;
using Snera_Core.Entities.UserEntities;
using Snera_Core.Models.UserModels;
using Snera_Core.UnitOfWork;
using System.Text.RegularExpressions;

namespace Snera_Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PasswordHasher<string> _passwordHasher;
        private readonly JwtService _tokenService;

        public UserService(IUnitOfWork unitOfWork, JwtService tokenService)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = new PasswordHasher<string>();
            _tokenService = tokenService;
        }

        public async Task<User> RegisterUserAsync(UserRegisterModel dto)
        {
            if (!Regex.IsMatch(dto.Email ?? "", @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new Exception(CommonErrors.InvalidEmailFormat);

            var userRepo = _unitOfWork.Repository<User>();
            var existingUser = await userRepo.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (existingUser != null)
                throw new Exception(CommonErrors.EmailAlreadyExists);

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                throw new Exception(CommonErrors.WeakPassword);


            var hashedPassword = _passwordHasher.HashPassword(dto.Email, dto.Password);

            var newUser = new User
            {
                FullName = dto.Full_Name,
                Avtar_Name = GenerateAvatarName(dto.Full_Name),
                Email = dto.Email,
                PasswordHash = hashedPassword,
                ProfileType = dto.Profile_Type,
                CurrentRole = dto.Current_Role,
                Experience = dto.Experience,
                Bio = dto.Bio,
                Created_Timestamp = DateTime.UtcNow
            };

            try
            {
                await userRepo.AddAsync(newUser);

                // FIX #1 — Ensure list is valid
                if (dto.UserSkills != null && dto.UserSkills.Any())
                {
                    var skillRepo = _unitOfWork.Repository<UserSkill>();
                    var userSkillEntities = new List<UserSkill>();

                    // FIX #2 — Correctly map each skill
                    foreach (var skill in dto.UserSkills)
                    {
                        userSkillEntities.Add(new UserSkill
                        {
                            Id = Guid.NewGuid(),
                            Skill_Name = skill,
                            Skill_Type = string.Empty,
                            UserId = newUser.Id
                        });
                    }

                    await skillRepo.AddRangeAsync(userSkillEntities);
                }

                // FIX #3 — Save changes safely
                await _unitOfWork.SaveAllAsync();
            }
            catch (Exception ex)
            {
                var msg = ex.InnerException?.Message ?? ex.Message;
                throw new Exception("DATABASE ERROR: " + msg);
            }

            return newUser;
        }

        public async Task<LoginResponseModel> LoginUserAsync(UserLoginModel dto)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var user = await userRepo.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                throw new Exception(CommonErrors.UserNotFound);

            var result = _passwordHasher.VerifyHashedPassword(dto.Email, user.PasswordHash, dto.Password);

            if (result != PasswordVerificationResult.Success)
                throw new Exception(CommonErrors.InvalidCredentials);

            var token = _tokenService.CreateToken(dto);

            return new LoginResponseModel
            {
                UserId = user.Id,
                UserName = user.FullName,
                LoginResponseString = "Login successful",
                UserEmail = dto.Email,
                AccessToken = token
            };
        }

        public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
        {
            var userRepo = _unitOfWork.Repository<User>();
            var users = await userRepo.GetAllAsync();

            return users.Select(u => new UserModel
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email
            });
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