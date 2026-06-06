namespace ApplyFlow.Api.Models
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string? City { get; set; }
        public string? Website { get; set; }
        public string? Note { get; set; }

        public List<JobApplication> JobApplications { get; set; } = [];
        public List<ContactPerson> ContactPersons { get; set; } = [];
    }
}
