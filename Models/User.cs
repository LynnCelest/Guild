using Guild.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Guild
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
        public int Currency { get; set; }
        [ForeignKey("QuestsId")]
        public virtual ICollection<Quest>? Quests { get; set; } = new List<Quest>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}
