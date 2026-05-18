using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using PocketHours.API.Data;
using PocketHours.API.Models;

namespace PocketHours.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IWebHostEnvironment _environment;

        private readonly ApplicationDbContext _context;

        public UsersController(
            IWebHostEnvironment environment,
            ApplicationDbContext context
        )
        {
            _environment = environment;

            _context = context;
        }

      
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult>
    GetProfile()
        {
            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    )!.Value
                );

            var user =
                await _context.Users.FindAsync(userId);

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

            return Ok(
                new
                {
                    id = user.Id,

                    firstName =
                        user.FirstName,

                    lastName =
                        user.LastName,

                    email =
                        user.Email,

                    phoneNumber =
                        user.PhoneNumber,

                    gender =
                        user.Gender,

                    city =
                        user.City,

                    role =
                        user.Role,

                    profileImageUrl =
                        user.ProfileImageUrl
                }
            );
        }

        [Authorize]
        [HttpPost("upload-profile-image")]
        public async Task<IActionResult>
    UploadProfileImage(
        IFormFile file
    )
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(
                    new
                    {
                        message = "No file uploaded"
                    }
                );
            }

            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    )!.Value
                );

            var user =
                await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(
                    new
                    {
                        message = "User not found"
                    }
                );
            }

            var uploadsFolder =
                Path.Combine(
                    _environment.WebRootPath,
                    "profiles"
                );

            var uniqueFileName =
                Guid.NewGuid().ToString()
                + "_"
                + file.FileName;

            var filePath =
                Path.Combine(
                    uploadsFolder,
                    uniqueFileName
                );

            using (
                var stream =
                    new FileStream(
                        filePath,
                        FileMode.Create
                    )
            )
            {
                await file.CopyToAsync(stream);
            }

            user.ProfileImageUrl =
                "/profiles/" + uniqueFileName;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
                gender = user.Gender,
                city = user.City,
                role = user.Role,
                profileImageUrl = user.ProfileImageUrl
            });
        }
    }
}