using Application.Commands.CommentInteractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentInteractionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentInteractionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> List([FromQuery] ListCommentInteractionsCommand command)
        {
            var interactions = await _mediator.Send(command);
            
            if (interactions == null || !interactions.Any())
            {
                return NotFound("Nenhum interação de comment encontrada");
            }

            return Ok(interactions);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] UpdateCommentInteractionCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

    }
}