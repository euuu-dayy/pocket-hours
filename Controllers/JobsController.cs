using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PocketHours.API.DTOs.Job;
using PocketHours.API.Interfaces;
using PocketHours.API.Models;

namespace PocketHours.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IJobRepository _jobRepository;

        private readonly ILogger<JobsController> _logger;

        public JobsController(
            IJobRepository jobRepository,
            ILogger<JobsController> logger
        )
        {
            _jobRepository = jobRepository;

            _logger = logger;
        }

        // ADMIN - CREATE JOB
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateJob(
            CreateJobDto dto
        )
        {
            _logger.LogInformation(
                "Creating new job: {Title}",
                dto.Title
            );

            var job = new Job
            {
                Title = dto.Title,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                BoysVacancies = dto.BoysVacancies,
                GirlsVacancies = dto.GirlsVacancies,
                Amount = dto.Amount,
                Address = dto.Address,
                AddressLink = dto.AddressLink,
                City = dto.City,
                Description = dto.Description,
                TransportationProvided =
                    dto.TransportationProvided,
                FoodProvided =
                    dto.FoodProvided
            };

            await _jobRepository.CreateJobAsync(job);

            return Ok(
                new
                {
                    message = "Job created successfully"
                }
            );
        }

        // PUBLIC - GET ALL JOBS
        [HttpGet]
        public async Task<IActionResult> GetAllJobs(
            int pageNumber = 1,
            int pageSize = 5,
            string? search = null,
            string? city = null
        )
        {
            var jobs =
                await _jobRepository.GetAllJobsAsync(
                    pageNumber,
                    pageSize,
                    search,
                    city
                );

            return Ok(jobs);
        }

        // PUBLIC - GET JOB BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobById(
            int id
        )
        {
            var job =
                await _jobRepository.GetJobByIdAsync(id);

            if (job == null)
            {
                return NotFound(
                    new
                    {
                        message = "Job not found"
                    }
                );
            }

            return Ok(job);
        }

        // ADMIN - UPDATE JOB
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(
            int id,
            UpdateJobDto dto
        )
        {
            var existingJob =
                await _jobRepository.GetJobByIdAsync(id);

            if (existingJob == null)
            {
                return NotFound(
                    new
                    {
                        message = "Job not found"
                    }
                );
            }

            existingJob.Title = dto.Title;
            existingJob.StartDate = dto.StartDate;
            existingJob.EndDate = dto.EndDate;
            existingJob.BoysVacancies =
                dto.BoysVacancies;
            existingJob.GirlsVacancies =
                dto.GirlsVacancies;
            existingJob.Amount = dto.Amount;
            existingJob.Address = dto.Address;
            existingJob.AddressLink =
                dto.AddressLink;
            existingJob.City = dto.City;
            existingJob.Description =
                dto.Description;
            existingJob.TransportationProvided =
                dto.TransportationProvided;
            existingJob.FoodProvided =
                dto.FoodProvided;

            await _jobRepository.UpdateJobAsync(
                existingJob
            );

            return Ok(
                new
                {
                    message = "Job updated successfully"
                }
            );
        }

        // ADMIN - DELETE JOB
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(
            int id
        )
        {
            _logger.LogWarning(
                "Deleting job with ID: {Id}",
                id
            );

            var existingJob =
                await _jobRepository.GetJobByIdAsync(id);

            if (existingJob == null)
            {
                return NotFound(
                    new
                    {
                        message = "Job not found"
                    }
                );
            }

            await _jobRepository.DeleteJobAsync(
                existingJob
            );

            return Ok(
                new
                {
                    message = "Job deleted successfully"
                }
            );
        }
    }
}