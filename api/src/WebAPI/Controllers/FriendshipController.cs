using Application.Commands.Friendships;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendshipController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FriendshipController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ListFriendshipRequests([FromQuery] ListFriendshipRequestsCommand command)
        {
            var requests = await _mediator.Send(command);

            if(requests == null || !requests.Any()){
                return NotFound("Nenhuma requisição de amizade encontrada");
            }

            return Ok(requests);    
        }

        [HttpGet("{id:guid}/friendList")]
        [Authorize]
        public async Task<IActionResult> ListUserFriendsRequest([FromRoute] Guid id)
        {
            var command = new ListUserFriendsCommand(id);
            var friendList = await _mediator.Send(command);
            return Ok(friendList);
        }
        
        [HttpGet("{id:guid}/blockedList")]
        [Authorize]
        public async Task<IActionResult> ListUserBlockedUsersRequest([FromRoute] Guid id)
        {
            var command = new ListUserBlockedUsersCommand(id);
            var blockedList = await _mediator.Send(command);
            return Ok(blockedList);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SendFriendshipRequest([FromBody] CreateFriendshipRequestCommand command)
        {
            await _mediator.Send(command);
            return Created();
        }

        [HttpPut("accept")]
        [Authorize]
        public async Task<IActionResult> AcceptFriendshipRequest([FromBody] AcceptFriendshipRequestCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPut("block")]
        [Authorize]
        public async Task<IActionResult> BlockOrUnblockFriendshipRequest([FromBody] BlockOrUnblockFriendshipRequestCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("deny")]
        [Authorize]
        public async Task<IActionResult> DenyOrUndoFriendshipRequest([FromBody] DenyOrUndoFriendshipRequestCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}