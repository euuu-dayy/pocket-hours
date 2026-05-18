using PocketHours.API.Models;

namespace PocketHours.API.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>>
            GetAllUsersAsync();

        Task<User?>
            GetUserByIdAsync(
                int id
            );

        Task DeleteUserAsync(
            User user
        );
    }
}