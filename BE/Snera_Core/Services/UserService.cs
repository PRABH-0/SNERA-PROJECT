using Microsoft.AspNetCore.Identity;
using Snera_Core.Entities;
using Snera_Core.Models.UserModels;
using Snera_Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Snera_Core.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PasswordHasher<string> _passwordHasher;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = new PasswordHasher<string>();
        }

        public async Task<User> RegisterUserAsync(UserRegisterModel dto)
        {
            // Validate email format
            if (!Regex.IsMatch(dto.Email ?? "", @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new Exception("Invalid email format.");

            // Use the generic repository for User
            var userRepo = _unitOfWork.Repository<User>();

            var existingUserList = await userRepo.FindAsync(u => u.Email == dto.Email);
            var existingUser = existingUserList.FirstOrDefault();
            if (existingUser != null)
                throw new Exception("Email already exists.");

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                throw new Exception("Password must be at least 6 characters long.");

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

            // Add user skills
            if (dto.UserSkills != null)
            {
                var userSkillRepo = _unitOfWork.Repository<UserSkill>();

                foreach (var skill in dto.UserSkills)
                {
                    await userSkillRepo.AddAsync(new UserSkill
                    {
                        Skill_Name = skill,
                        UserId = newUser.Id
                    });
                }
            }

            await _unitOfWork.CompleteAsync();
            return newUser;
        }

        public async Task<User> LoginUserAsync(UserLoginModel dto)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var userList = await userRepo.FindAsync(u => u.Email == dto.Email);
            var user = userList.FirstOrDefault();

            if (user == null)
                throw new Exception("User not found.");

            var result = _passwordHasher.VerifyHashedPassword(dto.Email, user.PasswordHash, dto.Password);
            if (result != PasswordVerificationResult.Success)
                throw new Exception("Invalid password.");

            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var userRepo = _unitOfWork.Repository<User>();
            return await userRepo.GetAllAsync();
        }
    }
}
