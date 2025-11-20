using Snera_Core.Entities;
using Snera_Core.Models.UserModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Snera_Core.Services
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(UserRegisterModel dto);
        Task<LoginResponseModel> LoginUserAsync(UserLoginModel dto);
        Task<IEnumerable<UserModel>> GetAllUsersAsync();
    }
}