using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Snera_Core.Interface;
using Snera_Core.Models.UserProjectModels;
using Snera_Core.Services;
using System.Data;

namespace Snera_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        [HttpPost("CreatePost")]
        [Authorize]
        public async Task<IActionResult> CreateProject(UserPostModel post)
        {
            try
            {
                var postResponse = await _projectService.CreateProject(post);
                return Ok(postResponse);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("GetProject")]
        [Authorize]
        public async Task<IActionResult> GetProject(string role,Guid postId) //role = admin || user || member
        {
            try
            {
                var userResponse = await _projectService.GetProject(role,postId);
                return Ok(userResponse);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
