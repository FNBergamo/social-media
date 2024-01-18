using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.ValueObjects;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class TokenService
    { 
        public string GenerateNewToken(AuthenticatedInfo authenticatedInfo, int timeInMinutes)
        {
            var secretKey = Encoding.UTF8.GetBytes(TokenSettings.SecretKey);

            TimeZoneInfo localTimeZone = TimeZoneInfo.Local;
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(localTimeZone.Id);
            
            DateTime currentDateTime = DateTime.UtcNow;
            DateTime expires = TimeZoneInfo.ConvertTime(currentDateTime.AddMinutes(timeInMinutes), timeZoneInfo);
            DateTime notBefore = TimeZoneInfo.ConvertTime(currentDateTime, timeZoneInfo);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = expires,
                NotBefore = notBefore,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", authenticatedInfo.Id.ToString()),
                    new Claim(ClaimTypes.Email, authenticatedInfo.Email),
                })
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var stringToken = tokenHandler.WriteToken(token);

            return stringToken;
        }

        public Token GenerateToken(AuthenticatedInfo authenticatedInfo)
        {
            var accessToken = GenerateNewToken(authenticatedInfo, TokenSettings.ExpiresInMinutes);
            var refreshToken = GenerateNewToken(authenticatedInfo, TokenSettings.RefreshTimeInMinutes);

            Token newToken = new() { AccessToken = accessToken, RefreshToken = refreshToken };
            return newToken;
        }

        public Token RefreshToken(string refreshToken)
        {
            var refreshTokenHandler = new JwtSecurityTokenHandler();
            var refreshTokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenSettings.SecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            };

            ClaimsPrincipal claimsPrincipal;
            try
            {
                claimsPrincipal = refreshTokenHandler.ValidateToken(refreshToken, refreshTokenValidationParameters, out _);
            }
            catch (SecurityTokenException)
            {
                return null;
            }

           var userId = claimsPrincipal.FindFirst("Id")?.Value;
            var userEmail = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userEmail))
            {
                return null;
            }

            var authenticatedInfo = new AuthenticatedInfo
            {
                Id = Guid.Parse(userId),
                Email = userEmail
            };

            var newAccessToken = GenerateNewToken(authenticatedInfo, TokenSettings.RefreshTimeInMinutes);
            
            var refreshedRefreshToken = GenerateNewToken(authenticatedInfo, TokenSettings.RenewdRefreshTimeInMinutes);

            Token newTokens = new() 
            { 
                AccessToken = newAccessToken, 
                RefreshToken = refreshedRefreshToken 
            };

            return newTokens;
        }

    }   
}