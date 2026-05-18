using Microsoft.EntityFrameworkCore;
using PocketHours.API.Data;
using PocketHours.API.Interfaces;
using PocketHours.API.Models;

namespace PocketHours.API.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _context;

        public JobRepository(
            ApplicationDbContext context
        )
        {
            _context = context;
        }

        public async Task<List<Job>> GetAllJobsAsync(
            int pageNumber,
            int pageSize,
            string? search,
            string? city
        )
        {
            var query =
                _context.Jobs.AsQueryable();

            // SEARCH
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x =>
                    x.Title.Contains(search)
                );
            }

            // FILTER BY CITY
            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(x =>
                    x.City == city
                );
            }

            // PAGINATION
            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Job> GetJobByIdAsync(int id)
        {
            return await _context.Jobs
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task CreateJobAsync(Job job)
        {
            await _context.Jobs.AddAsync(job);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateJobAsync(Job job)
        {
            _context.Jobs.Update(job);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteJobAsync(Job job)
        {
            _context.Jobs.Remove(job);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteApplicationAsync(JobApplication application)
        {
            _context.JobApplications
                .Remove(application);

            await _context
                .SaveChangesAsync();
        }
    }
}