using Snera_Core.Data;
using Snera_Core.Interface;
using Snera_Core.Repositories;
using Snera_Core.Unitofwork.Snera_Core.Interfaces;
using System.Threading.Tasks;

namespace Snera_Core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context; 
        public IUserRepository Users { get; }

        public UnitOfWork(DataContext context, IUserRepository users)
        {
            _context = context;
            Users = users;
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
