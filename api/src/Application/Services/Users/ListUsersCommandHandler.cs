using Application.Commands.Users;
using Application.Mappers;
using Application.Responses;
using Domain.Entitties;
using Domain.Interfaces;
using MediatR;

namespace Application.Services.Users
{
    public class ListUsersCommandHandler : IRequestHandler<ListUsersCommand, IEnumerable<UserResponse>>
    {
        private readonly IUserRepository _userRepository;

        public ListUsersCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UserResponse>> Handle(ListUsersCommand request, CancellationToken cancellationToken)
        {
            IEnumerable<User> usersList =  await _userRepository.List();

            var userResponses = new List<UserResponse>();

            foreach (var user in usersList)
            {
                UserResponse response = UserMapper.MapToUserResponse(user);
                userResponses.Add(response);
            }

            return userResponses;
        }
    }
}