using Guild.Models;
using System.ComponentModel.DataAnnotations;

namespace Guild
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
        public int Currency { get; set; }
        public int? QuestsId { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public ICollection<Quest>? Quests { get; set; } = new List<Quest>();
    }
}
