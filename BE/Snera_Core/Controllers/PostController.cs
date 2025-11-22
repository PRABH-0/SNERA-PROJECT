using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Snera_Core.Entities.PostEntities;
using Snera_Core.Interface;
using Snera_Core.Models;
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
        public async Task<IActionResult> CreateUserPost(UserPostDetailsModel post)
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
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllPost(Guid userId, [FromQuery] FilterModel filter )
        {
            try
            {
                var response = await _postService.GetAllPostAsync(filter,userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("UpdateLike")]
        [Authorize]
        public async Task<IActionResult> UpdatePostLike(PostLikeModel dto)
        {
            try
            {
                var response = await _postService.UpdatePostLikeAsync(dto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpPost("CreateComment")]
        [Authorize]
        public async Task<IActionResult> CreatePostComment(PostCommentModel postcomment)
        {
            try
            {
                var response = await _postService.CreatePostComment(postcomment);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("GetPostComments/{postId}")]
        [Authorize]
        public async Task<IActionResult> GetPostComments(Guid postId)
        {
            try
            {
                var response = await _postService.GetPostComments(postId);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("GetPostLikes/{postId}")]
        [Authorize]
        public async Task<IActionResult> GetPostLikes(Guid postId)
        {
            try
            {
                var response = await _postService.GetPostLikes(postId);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }
}
