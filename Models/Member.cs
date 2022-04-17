using Guild.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Guild
{
    public class Member
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
        public string Gender { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Address { get; set; } = String.Empty;
        public float Currency { get; set; }
        public virtual ICollection<MemberQuest>? MemberQuests { get; set; } = new List<MemberQuest>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}
