using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using PocketHours.API.Interfaces;
using PocketHours.API.Models;

using System.Security.Claims;

namespace PocketHours.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController
        : ControllerBase
    {
        private readonly
            IJobApplicationRepository
            _applicationRepository;

        private readonly
            IJobRepository
            _jobRepository;

        public JobApplicationsController(
            IJobApplicationRepository
                applicationRepository,

            IJobRepository
                jobRepository
        )
        {
            _applicationRepository =
                applicationRepository;

            _jobRepository =
                jobRepository;
        }

        // APPLY TO JOB

        [Authorize]
        [HttpPost("{jobId}")]
        public async Task<IActionResult>
            ApplyToJob(int jobId)
        {
            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    )!.Value
                );

            var existingJob =
                await _jobRepository
                    .GetJobByIdAsync(jobId);

            if (existingJob == null)
            {
                return NotFound(
                    new
                    {
                        message =
                            "Job not found"
                    }
                );
            }

            bool alreadyApplied =
                await _applicationRepository
                    .HasUserAppliedAsync(
                        userId,
                        jobId
                    );

            if (alreadyApplied)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "You already applied"
                    }
                );
            }

            var application =
                new JobApplication
                {
                    UserId = userId,

                    JobId = jobId,

                    AppliedAt =
                        DateTime.UtcNow
                };

            await _applicationRepository
                .ApplyToJobAsync(
                    application
                );

            return Ok(
                new
                {
                    message =
                        "Applied successfully"
                }
            );
        }

        // GET MY APPLICATIONS

        [Authorize]
        [HttpGet("my-applications")]
        public async Task<IActionResult>
            GetMyApplications()
        {
            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    )!.Value
                );

            var applications =
                await _applicationRepository
                    .GetUserApplicationsAsync(
                        userId
                    );

            return Ok(applications);
        }

        // CANCEL APPLICATION

        [Authorize(Roles = "User")]
        [HttpDelete("cancel/{id}")]
        public async Task<IActionResult>
            CancelApplication(int id)
        {
            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    )!.Value
                );

            var applications =
                await _applicationRepository
                    .GetUserApplicationsAsync(
                        userId
                    );

            var application =
                applications.FirstOrDefault(
                    a => a.Id == id
                );

            if (application == null)
            {
                return NotFound(
                    new
                    {
                        message =
                            "Application not found"
                    }
                );
            }

            var appliedTime =
                application.AppliedAt;

            var currentTime =
                DateTime.UtcNow;

            var difference =
                currentTime - appliedTime;

            if (
                difference.TotalHours > 1
            )
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Application cancellation time expired"
                    }
                );
            }

            await _applicationRepository
                .DeleteApplicationAsync(
                    application
                );

            return Ok(
                new
                {
                    message =
                        "Application cancelled successfully"
                }
            );
        }
    }
}