using Snera_Core.Data;
using Snera_Core.Entities;
using Snera_Core.Interfaces;
using Snera_Core.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Snera_Core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly Dictionary<Type, object> _repositories = new();

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IRepository<T> Repository<T>() where T : class
        {
            if (!_repositories.ContainsKey(typeof(T)))
            {
                _repositories[typeof(T)] = new Repository<T>(_context);
            }

            return (IRepository<T>)_repositories[typeof(T)];
        }

        private IRepository<User>? _userRepository;
        public IRepository<User> Users
        {
            get
            {
                if (_userRepository == null)
                    _userRepository = Repository<User>();
                return _userRepository;
            }
        }

        private IRepository<UserSkill>? _userSkillRepository;
        public IRepository<UserSkill> UserSkills
        {
            get
            {
                if (_userSkillRepository == null)
                    _userSkillRepository = Repository<UserSkill>();
                return _userSkillRepository;
            }
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
