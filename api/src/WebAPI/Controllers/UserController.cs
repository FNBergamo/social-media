using Application.Commands.Users;
using Application.Responses;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly TokenService _tokenService;
        public UserController(IMediator mediator, TokenService tokenService)
        {
            _mediator = mediator;
            _tokenService = tokenService;
        }

        [HttpGet]
        [Authorize]
        public async  Task<IActionResult> ListUsers([FromQuery] ListUsersCommand command)
        {
            var users = await _mediator.Send(command);
            return Ok(users);
        }


        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> FindUserById([FromRoute] Guid id)
        {
            var command = new FindUserByIdCommand(id);
            var user = await _mediator.Send(command);
            return Ok(user);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
        {
            var authenticatedInfo = await _mediator.Send(command);

            if (!authenticatedInfo.IsAuthenticated)
                return BadRequest("Houve um erro ao registrar");

            var token = _tokenService.GenerateToken(authenticatedInfo);

            // TODO - retornar status created
            return Ok( new
            {
                token.AccessToken,
                token.RefreshToken,
                userId = authenticatedInfo.Id,
            });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var authenticatedInfo = await _mediator.Send(command);
            
            if (!authenticatedInfo.IsAuthenticated)
                return BadRequest("Usuário e/ou senha inválidos");

            var token = _tokenService.GenerateToken(authenticatedInfo);

            return Ok( new
            {
                token.AccessToken,
                token.RefreshToken,
                userId = authenticatedInfo.Id,
            });
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserCommand command)
        {
            command.AssignId(id);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] Guid id, [FromBody] DeleteUserCommand command)
        {
            command.AssignId(id);
            await _mediator.Send(command);
            return Ok();
        }
    }
}
