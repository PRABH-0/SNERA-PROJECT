using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Snera_Core.Entities.UserEntities;
using Snera_Core.Interface;
using Snera_Core.Models.HelperModels;
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
        [HttpPost("GetAllProject")]  
        [Authorize]
        public async Task<IActionResult> GetAllProject(FilterModel model) //role = admin || user || member
        {
            try
            {
                var userResponse = await _projectService.GetAllPosts(model);
                return Ok(userResponse);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("LikeProjectPost")]
        [Authorize]
        public async Task<IActionResult> LikeProjectPost(Guid userId, Guid projectId)
        {
            try
            {
                var response = await _projectService.LikeProjectPost(userId, projectId);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("CommentOnProject")]
        [Authorize]
        public async Task<IActionResult> CommentOnProject(Guid userId, Guid projectId, string comment)
        {
            try
            {
                var response = await _projectService.CommentOnProject(userId, projectId, comment);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
