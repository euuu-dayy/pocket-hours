using PocketHours.API.Models;

namespace PocketHours.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> GetUserByEmailAsync(string email);

        Task CreateUserAsync(User user);
    }
}