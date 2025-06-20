using System.Net;
using System.Text.Json;
using SimpleAPI.Errors;

namespace SimpleAPI.Middlewares;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
{

    // Should have the name InvokeAsync and an async task
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);

            // Returning the exception in an JSON format
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;


            // if the env is development we are returning the stack trace else we are just
            // returning the messase as Internal Server error.
            var response = env.IsDevelopment()
            ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new ApiException(context.Response.StatusCode, ex.Message, "Internal server error");

            // options for JSON serialzier
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            // Serialzing the response to be a json camelcased data
            var json = JsonSerializer.Serialize(response, options);

            // writing the json response asynchronously
            await context.Response.WriteAsync(json);
        }
    }

}