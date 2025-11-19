using Microsoft.AspNetCore.Identity;
using Snera_Core.Common;
using Snera_Core.Entities;
using Snera_Core.Models.UserModels;
using Snera_Core.UnitOfWork;
using System.Text.RegularExpressions;

namespace Snera_Core.Services
{
    public class UserService
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
            var existingUser = (await userRepo.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();

            if (existingUser != null)
                throw new Exception(CommonErrors.EmailAlreadyExists);

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                throw new Exception(CommonErrors.WeakPassword);

            var hashedPassword = _passwordHasher.HashPassword(dto.Email, dto.Password);

            var newUser = new User
            {
                FullName = dto.Full_Name,
                Email = dto.Email,
                PasswordHash = hashedPassword,
                ProfileType = dto.Profile_Type,
                CurrentRole = dto.Current_Role,
                Experience = dto.Experience,
                Bio = dto.Bio,
                Created_Timestamp = DateTime.UtcNow
            };

            await userRepo.AddAsync(newUser);

            if (dto.UserSkills != null)
            {
                var skillRepo = _unitOfWork.Repository<UserSkill>();

                foreach (var skill in dto.UserSkills)
                {
                    await skillRepo.AddAsync(new UserSkill
                    {
                        Skill_Name = skill,
                        UserId = newUser.Id
                    });
                }
            }

            await _unitOfWork.SaveAllAsync();
            return newUser;
        }

        public async Task<LoginResponseModel> LoginUserAsync(UserLoginModel dto)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var user = (await userRepo.FindAsync(u => u.Email == dto.Email)).FirstOrDefault();

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
    }
}
