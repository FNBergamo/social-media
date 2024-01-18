using Application.Commands.Posts;
using Domain.Entitties;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async  Task<IActionResult> ListPosts([FromQuery] ListPostsCommand command)
        {
            var posts = await _mediator.Send(command);

            return Ok(posts);
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> FindPostById([FromRoute] Guid id)
        {
            var command = new FindPostByIdCommand(id);
            Post post = await _mediator.Send(command);
            
            return Ok(post);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreatePostCommand command)
        {
            await _mediator.Send(command);
            return Created();
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdatePostCommand command)
        {
            command.AssignId(id);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var command = new DeletePostCommand(id);

            await _mediator.Send(command);
            return Ok();
        }
    }
}