using AutoMapper;
using SimpleAPI.DTO;
using SimpleAPI.Entities;
using SimpleAPI.Extensions;

namespace SimpleAPI.Helpers;

public class AutomapperProfiles : Profile
{
    public AutomapperProfiles()
    {
        // Creating an mapper for user and members DTO
        CreateMap<User, MemberDto>()
            // Serializing age
            .ForMember(destination => destination.Age, options => options
            .MapFrom(source => source.DateOfBirth.CalculateAge()))
            // Serializig photo url in the memebers DTO
            .ForMember(destination => destination.PhotoUrl, option => option
            .MapFrom(source => source.Photos.FirstOrDefault(x => x.IsMain)!.Url));


        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, User>();
        CreateMap<RegisterDto, User>();
        CreateMap<string, DateOnly>().ConvertUsing(s => DateOnly.Parse(s));
            
    }

}