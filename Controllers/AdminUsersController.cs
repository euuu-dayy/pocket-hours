using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using PocketHours.API.Interfaces;

namespace PocketHours.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminUsersController
        : ControllerBase
    {
        private readonly
            IUserRepository
            _userRepository;

        public AdminUsersController(
            IUserRepository userRepository
        )
        {
            _userRepository =
                userRepository;
        }

        // GET ALL USERS

        [HttpGet]
        public async Task<IActionResult>
            GetAllUsers()
        {
            var users =
                await _userRepository
                    .GetAllUsersAsync();

            return Ok(users);
        }

        // DELETE USER

        [HttpDelete("{id}")]
        public async Task<IActionResult>
            DeleteUser(int id)
        {
            var user =
                await _userRepository
                    .GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound(
                    new
                    {
                        message =
                            "User not found"
                    }
                );
            }

            await _userRepository
                .DeleteUserAsync(user);

            return Ok(
                new
                {
                    message =
                        "User deleted successfully"
                }
            );
        }
    }
}