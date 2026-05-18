using Microsoft.EntityFrameworkCore;

using PocketHours.API.Data;
using PocketHours.API.Interfaces;
using PocketHours.API.Models;

namespace PocketHours.API.Repositories
{
    public class
        JobApplicationRepository
        : IJobApplicationRepository
    {
        private readonly
            ApplicationDbContext
            _context;

        public JobApplicationRepository(
            ApplicationDbContext context
        )
        {
            _context = context;
        }

        public async Task<bool>
            HasUserAppliedAsync(
                int userId,
                int jobId
            )
        {
            return await _context
                .JobApplications
                .AnyAsync(x =>
                    x.UserId == userId
                    &&
                    x.JobId == jobId
                );
        }

        public async Task
            ApplyToJobAsync(
                JobApplication application
            )
        {
            await _context
                .JobApplications
                .AddAsync(application);

            await _context
                .SaveChangesAsync();
        }

        public async Task<List<JobApplication>>
            GetUserApplicationsAsync(
                int userId
            )
        {
            return await _context
                .JobApplications
                .Include(x => x.Job)
                .Where(x =>
                    x.UserId == userId
                )
                .ToListAsync();
        }

        public async Task
            DeleteApplicationAsync(
                JobApplication application
            )
        {
            _context
                .JobApplications
                .Remove(application);

            await _context
                .SaveChangesAsync();
        }
    }
}