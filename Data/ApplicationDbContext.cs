using Microsoft.EntityFrameworkCore;

using PocketHours.API.Models;

namespace PocketHours.API.Data
{
    public class ApplicationDbContext
        : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext>
                options
        ) : base(options)
        {
        }

        public DbSet<User>
            Users
        { get; set; }

        public DbSet<Job>
            Jobs
        { get; set; }

        public DbSet<JobApplication>
            JobApplications
        { get; set; }

        protected override void
            OnModelCreating(
                ModelBuilder modelBuilder
            )
        {
            base.OnModelCreating(
                modelBuilder
            );

            modelBuilder
                .Entity<User>()
                .ToTable("users");

            modelBuilder
                .Entity<Job>()
                .ToTable("jobs");

            modelBuilder
                .Entity<JobApplication>()
                .ToTable(
                    "jobapplications"
                );
        }
    }
}