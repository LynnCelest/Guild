using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public float Reward { get; set; }
        public virtual ICollection<MemberQuest>? MemberQuests { get; set; } = new List<MemberQuest>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public DateTime? CompletedDateTime { get; set; }
    }
}
