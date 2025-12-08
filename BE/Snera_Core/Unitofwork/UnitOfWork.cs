using Snera_Core.Data;
using Snera_Core.Entities;
using Snera_Core.Entities.ProjectEntities;
using Snera_Core.Entities.UserEntities;
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
            _repositories[typeof(T)] = new Repository<T>(_context);

        return (IRepository<T>)_repositories[typeof(T)];
    }

    // ----------------------
    // USER REPOSITORIES
    // ----------------------

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

    // ----------------------
    // PROJECT REPOSITORIES
    // ----------------------

    private IRepository<UserProject>? _userProjectRepository;
    public IRepository<UserProject> UserProject
    {
        get
        {
            if (_userProjectRepository == null)
                _userProjectRepository = Repository<UserProject>();
            return _userProjectRepository;
        }
    }

    private IRepository<ProjectDescription>? _projectDescriptionRepository;
    public IRepository<ProjectDescription> ProjectDescription
    {
        get
        {
            if (_projectDescriptionRepository == null)
                _projectDescriptionRepository = Repository<ProjectDescription>();
            return _projectDescriptionRepository;
        }
    }

    private IRepository<ProjectTeamMembers>? _projectTeamMembersRepository;
    public IRepository<ProjectTeamMembers> ProjectTeamMembers
    {
        get
        {
            if (_projectTeamMembersRepository == null)
                _projectTeamMembersRepository = Repository<ProjectTeamMembers>();
            return _projectTeamMembersRepository;
        }
    }

    private IRepository<ProjectCurrentTasks>? _projectCurrentTasksRepository;
    public IRepository<ProjectCurrentTasks> ProjectCurrentTasks
    {
        get
        {
            if (_projectCurrentTasksRepository == null)
                _projectCurrentTasksRepository = Repository<ProjectCurrentTasks>();
            return _projectCurrentTasksRepository;
        }
    }

    private IRepository<ProjectTaskTimeline>? _projectTaskTimelineRepository;
    public IRepository<ProjectTaskTimeline> ProjectTaskTimeline
    {
        get
        {
            if (_projectTaskTimelineRepository == null)
                _projectTaskTimelineRepository = Repository<ProjectTaskTimeline>();
            return _projectTaskTimelineRepository;
        }
    }

    private IRepository<ProjectDeveloperRequest>? _projectDeveloperRequestRepository;
    public IRepository<ProjectDeveloperRequest> ProjectDeveloperRequest
    {
        get
        {
            if (_projectDeveloperRequestRepository == null)
                _projectDeveloperRequestRepository = Repository<ProjectDeveloperRequest>();
            return _projectDeveloperRequestRepository;
        }
    }

    // ----------------------

    public async Task<int> SaveAllAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
