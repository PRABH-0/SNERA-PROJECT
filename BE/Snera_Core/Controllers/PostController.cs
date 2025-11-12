using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Interface;
using Snera_Core.Models.UserPostModels;

namespace Snera_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUserPost(UserPostModel post)
        {
            try
            {
                var userResponse = await _postService.CreateUserPost(post);
                return Ok(userResponse);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
