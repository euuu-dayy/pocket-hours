using Microsoft.EntityFrameworkCore;

using PocketHours.API.Data;
using PocketHours.API.Interfaces;
using PocketHours.API.Models;

namespace PocketHours.API.Repositories
{
    public class UserRepository
        : IUserRepository
    {
        private readonly
            ApplicationDbContext
            _context;

        public UserRepository(
            ApplicationDbContext context
        )
        {
            _context = context;
        }

        public async Task<List<User>>
            GetAllUsersAsync()
        {
            return await _context.Users
                .OrderByDescending(
                    x => x.Id
                )
                .ToListAsync();
        }

        public async Task<User?>
            GetUserByIdAsync(
                int id
            )
        {
            return await _context.Users
                .FirstOrDefaultAsync(
                    x => x.Id == id
                );
        }

        public async Task
            DeleteUserAsync(
                User user
            )
        {
            _context.Users
                .Remove(user);

            await _context
                .SaveChangesAsync();
        }
    }
}