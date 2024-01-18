using Application.Commands.Comments;
using Domain.Entitties;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async  Task<IActionResult> ListComments([FromQuery] ListCommentsCommand command)
        {
            var comments = await _mediator.Send(command);

            return Ok(comments);
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> FindCommentById([FromRoute] Guid id)
        {
            var command = new FindCommentByIdCommand(id);
            Comment comment = await _mediator.Send(command);
            
            if (comment is null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpGet("post/{id:guid}")]
        [Authorize]
        public async Task<IActionResult> FindCommentByPost([FromRoute] Guid id, [FromQuery] FindCommentsByPostCommand command)
        {
            command.AssignId(id);
            var comments = await _mediator.Send(command);
            
            return Ok(comments);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCommentCommand command)
        {
            var comment = await _mediator.Send(command);
            return Ok(comment);
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var command = new DeleteCommentCommand(id);

            await _mediator.Send(command);
            return Ok();
        }
    }
}