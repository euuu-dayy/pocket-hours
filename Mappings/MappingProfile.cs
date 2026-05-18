using AutoMapper;
using PocketHours.API.DTOs.Auth;
using PocketHours.API.DTOs.Job;
using PocketHours.API.Models;

namespace PocketHours.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // AUTH
            CreateMap<RegisterDto, User>();

            // JOB
            CreateMap<CreateJobDto, Job>();

            CreateMap<UpdateJobDto, Job>();
        }
    }
}