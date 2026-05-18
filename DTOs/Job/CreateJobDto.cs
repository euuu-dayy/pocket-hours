using System.ComponentModel.DataAnnotations;

namespace PocketHours.API.DTOs.Job
{
    public class CreateJobDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public int BoysVacancies { get; set; }

        public int GirlsVacancies { get; set; }

        public decimal Amount { get; set; }

        [Required]
        public string Address { get; set; }

        public string AddressLink { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Description { get; set; }

        public bool TransportationProvided { get; set; }

        public bool FoodProvided { get; set; }
    }
}