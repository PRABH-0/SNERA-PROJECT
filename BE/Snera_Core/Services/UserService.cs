using Microsoft.AspNetCore.Identity;
using Snera_Core.Entities;
using Snera_Core.Models.UserModels;
using Snera_Core.Unitofwork.Snera_Core.Interfaces;
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
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                !Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new Exception("Invalid email format.");

            var existingUser = await _unitOfWork.Users.GetUserByEmailAsync(dto.Email);
            if (existingUser != null)
                throw new Exception("Email already exists.");

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                throw new Exception("Password must be at least 6 characters long.");

            // ✅ Hash password before saving
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

            await _unitOfWork.Users.RegisterAsync(newUser);
            await _unitOfWork.CompleteAsync();
            return newUser;
        }

        // ✅ LOGIN
        public async Task<User> LoginUserAsync(UserLoginModel dto)
        {
            var user = await _unitOfWork.Users.GetUserByEmailAsync(dto.Email);

            if (user == null)
                throw new Exception("User not found.");

            // ✅ Verify hashed password
            var result = _passwordHasher.VerifyHashedPassword(dto.Email, user.PasswordHash, dto.Password);

            if (result != PasswordVerificationResult.Success)
                throw new Exception("Invalid password.");

            return user;
        }

        // ✅ GET ALL USERS
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _unitOfWork.Users.GetAllUsersAsync();
        }
    }
}
