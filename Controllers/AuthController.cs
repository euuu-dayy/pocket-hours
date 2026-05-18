using Microsoft.AspNetCore.Mvc;
using PocketHours.API.DTOs.Auth;
using PocketHours.API.Interfaces;
using PocketHours.API.Models;
using PocketHours.API.Helpers;

namespace PocketHours.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        private readonly JwtHelper _jwtHelper;

        public AuthController(
            IAuthRepository authRepository,
            JwtHelper jwtHelper
        )
        {
            _authRepository = authRepository;

            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterDto dto
        )
        {
            var existingUser =
                await _authRepository.GetUserByEmailAsync(dto.Email);

            if (existingUser != null)
            {
                return BadRequest(
                    new
                    {
                        message = "Email already exists"
                    }
                );
            }

            string hashedPassword =
                BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = hashedPassword,
                PhoneNumber = dto.PhoneNumber,
                Gender = dto.Gender,
                City = dto.City
            };

            await _authRepository.CreateUserAsync(user);

            return Ok(
                new
                {
                    message = "User registered successfully"
                }
            );
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginDto dto
        )
        {
            var user =
                await _authRepository.GetUserByEmailAsync(dto.Email);

            if (user == null)
            {
                return Unauthorized(
                    new
                    {
                        message = "Invalid email or password"
                    }
                );
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash
                );

            if (!isPasswordValid)
            {
                return Unauthorized(
                    new
                    {
                        message = "Invalid email or password"
                    }
                );
            }

            string token =
                _jwtHelper.GenerateToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    phoneNumber = user.PhoneNumber,
                    gender = user.Gender,
                    city = user.City,
                    role = user.Role,
                    profileImageUrl =
            user.ProfileImageUrl
                }
            });
        }
    }
}