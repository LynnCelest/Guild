using Guild.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Guild.Models
{
    public class MemberQuest
    {
        public int QuestId { get; set; }
        public virtual Quest? Quest { get; set; }
        public int MemberId { get; set; }
        public virtual Member? Member { get; set; }
        public bool IsAdmin { get; set; }
        public int Score { get; set; }
    }
}
