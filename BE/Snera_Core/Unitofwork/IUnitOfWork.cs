namespace Snera_Core.Unitofwork
{
    using global::Snera_Core.Interface;
    using System.Threading.Tasks;

    namespace Snera_Core.Interfaces
    {
        public interface IUnitOfWork
        {
            IUserRepository Users { get; }
            Task<int> CompleteAsync();     // commits changes (SaveChangesAsync)
            void Dispose();                // optional (or inherit IDisposable)
        }
    }

}
