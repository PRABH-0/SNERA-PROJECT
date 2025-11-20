using Snera_Core.Data;
using Snera_Core.Entities;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Interfaces;
using Snera_Core.Repositories;
using Snera_Core.UnitOfWork;

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

    // Add these properties for commonly used repositories
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

    // Add properties for your post-related entities
    private IRepository<UserPost>? _userPostRepository;
    public IRepository<UserPost> UserPosts
    {
        get
        {
            if (_userPostRepository == null)
                _userPostRepository = Repository<UserPost>();
            return _userPostRepository;
        }
    }

    private IRepository<PostComments>? _postCommentsRepository;
    public IRepository<PostComments> PostComments
    {
        get
        {
            if (_postCommentsRepository == null)
                _postCommentsRepository = Repository<PostComments>();
            return _postCommentsRepository;
        }
    }

    private IRepository<PostLikes>? _postLikesRepository;
    public IRepository<PostLikes> PostLikes
    {
        get
        {
            if (_postLikesRepository == null)
                _postLikesRepository = Repository<PostLikes>();
            return _postLikesRepository;
        }
    }

    // Add other repository properties as needed...

    public async Task<int> SaveAllAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}