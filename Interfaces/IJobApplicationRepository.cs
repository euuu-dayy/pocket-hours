using PocketHours.API.Models;

namespace PocketHours.API.Interfaces
{
    public interface
        IJobApplicationRepository
    {
        Task<bool>
            HasUserAppliedAsync(
                int userId,
                int jobId
            );

        Task ApplyToJobAsync(
            JobApplication application
        );

        Task<List<JobApplication>>
            GetUserApplicationsAsync(
                int userId
            );

        Task DeleteApplicationAsync(
            JobApplication application
        );
    }
}