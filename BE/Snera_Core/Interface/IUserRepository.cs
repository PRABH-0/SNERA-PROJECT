using Snera_Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Snera_Core.Interface
{
    public interface IUserRepository
    {
        Task<User> RegisterAsync(User user);
        Task<User?> GetUserByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}
