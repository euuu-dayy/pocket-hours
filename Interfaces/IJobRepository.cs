using PocketHours.API.Models;

namespace PocketHours.API.Interfaces
{
    public interface IJobRepository
    {
        Task<List<Job>> GetAllJobsAsync(
            int pageNumber,
            int pageSize,
            string? search,
            string? city
        );

        Task<Job> GetJobByIdAsync(int id);

        Task CreateJobAsync(Job job);

        Task UpdateJobAsync(Job job);

        Task DeleteJobAsync(Job job);

        Task DeleteApplicationAsync(JobApplication application);
    }
}