using System.Security.Claims;

namespace SimpleAPI.Extensions;

public static class ClaimsPrincipleExtension
{
    public static string GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.Name)?.Value
                ?? throw new Exception("Cannot get username from token.\nplease try logging in again.");
    }

    public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new Exception("Cannot get username from token.\nplease try logging in again."));
    }

}