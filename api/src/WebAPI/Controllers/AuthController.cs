using Application.Commands.Auth;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly TokenService _tokenService;
        public AuthController(IMediator mediator, TokenService tokenService)
        {
            _mediator = mediator;
            _tokenService = tokenService;
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async  Task<IActionResult> Refresh([FromBody] RefreshTokenCommand command)
        {
            var tokens = _tokenService.RefreshToken(command.RefreshToken);

            return Ok(new {
                tokens.AccessToken,
                tokens.RefreshToken
            });
        }
    }
}