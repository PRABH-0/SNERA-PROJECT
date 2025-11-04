using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Snera_Core.Models.UserModels;
using Snera_Core.UnitOfWork;

namespace Snera_Core.Services
{
    public class JwtService
    {
        private readonly DbContext _dbcontext;
        private readonly IConfiguration _configration;
        private readonly IUnitOfWork _unitOfWork;
        public JwtService(DbContext dbcontext, IConfiguration configration,IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
            _configration = configration;
        }
        
    }
}
