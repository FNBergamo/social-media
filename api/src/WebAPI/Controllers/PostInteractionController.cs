using Application.Commands.PostInteractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostInteractionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostInteractionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> List([FromQuery] ListPostInteractionsCommand command)
        {
            var interactions = await _mediator.Send(command);
            
            if (interactions == null || !interactions.Any())
            {
                return NotFound("Nenhum interação de post encontrada");
            }

            return Ok(interactions);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] UpdatePostInteractionCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

    }
}