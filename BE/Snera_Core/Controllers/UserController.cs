using Microsoft.AspNetCore.Mvc;
using Snera_Core.Models.UserModels;
using Snera_Core.Services;
using System.Threading.Tasks;

namespace Snera_Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel dto)
        {
            try
            {
                var user = await _userService.RegisterUserAsync(dto);
                return CreatedAtAction(nameof(Register), new { id = user.Id }, new
                {
                    message = "User registered successfully!",
                    user.Id,
                    user.Email
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel dto)
        {
            try
            {
                var user = await _userService.LoginUserAsync(dto);
                return Ok(new
                {
                    message = "Login successful!",
                    user.Id,
                    user.Email
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
    }
}
