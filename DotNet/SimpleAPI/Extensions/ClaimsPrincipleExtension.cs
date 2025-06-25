using System.Security.Claims;

namespace SimpleAPI.Extensions;

public static class ClaimsPrincipleExtension
{
    public static string GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new Exception("Cannot get username from token.\nplease try logging in again.");
    }

}