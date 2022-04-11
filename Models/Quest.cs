using System.ComponentModel.DataAnnotations;

namespace Guild.Models
{
    public class Quest
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        [Range(0, int.MaxValue)]
        public int Reward { get; set; }
        public int? UsersId { get; set; }
        public ICollection<User>? Users { get; set; } = new List<User>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public DateTime? CompletedDateTime { get; set; }
    }
}
