#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Guild.Data;
using Guild.Models;
using Microsoft.Data.SqlClient;
using System.Diagnostics;

namespace Guild.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberQuestsController : ControllerBase
    {
        private readonly AppDBContext _context;

        public MemberQuestsController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/MemberQuests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberQuest>>> GetMemberQuest()
        {
            return await _context.MemberQuest.ToListAsync();
        }

        // GET: api/MemberQuests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberQuest>> GetMemberQuest(int id)
        {
            var memberQuest = await _context.MemberQuest.FindAsync(id);

            if (memberQuest == null)
            {
                return NotFound();
            }

            return memberQuest;
        }

        // PUT: api/MemberQuests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<ActionResult<IEnumerable<MemberQuest>>> PutMembers(MemberQuest[] MemberQuests)
        {
            MemberQuest[] result = new MemberQuest[MemberQuests.Length];
            for (int i = 0; i < MemberQuests.Length; i++)
            {
                MemberQuest memberQuest = MemberQuests[i];
                int status = _context.Database.ExecuteSqlRaw(
                    "UPDATE MemberQuest " +
                    "SET Score = @Score " +
                    "WHERE MemberId = @MemberId " +
                    "AND QuestId = @QuestId", new SqlParameter[] {
                        new SqlParameter("@Score", memberQuest.Score),
                        new SqlParameter("@MemberId", memberQuest.MemberId),
                        new SqlParameter("@QuestId", memberQuest.QuestId)});

                IEnumerable<MemberQuest> curMemberQuest = _context.MemberQuest.FromSqlRaw(
                    "SELECT * " +
                    "FROM MemberQuest " +
                    "WHERE MemberId = @MemberId " +
                    "AND QuestId = @QuestId", new SqlParameter[] {
                        new SqlParameter("@Score", memberQuest.Score),
                        new SqlParameter("@MemberId", memberQuest.MemberId),
                        new SqlParameter("@QuestId", memberQuest.QuestId)})
                    .Include(mq => mq.Member).Include(mq => mq.Quest);

                if (curMemberQuest.Count() > 0)
                {
                    result[i] = curMemberQuest.ElementAt<MemberQuest>(0);
                }
            }

            return result;
        }

        // PUT: api/MemberQuests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberQuest(int id, MemberQuest memberQuest)
        {
            if (id != memberQuest.MemberId)
            {
                return BadRequest();
            }

            _context.Entry(memberQuest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberQuestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MemberQuests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemberQuest>> PostMemberQuest(MemberQuest memberQuest)
        {
            _context.MemberQuest.Add(memberQuest);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MemberQuestExists(memberQuest.MemberId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMemberQuest", new { id = memberQuest.MemberId }, memberQuest);
        }

        // DELETE: api/MemberQuests/byIds?questId=1&memberId=2
        [HttpDelete("byIds")]
        public async Task<IActionResult> DeleteMemberQuest(int questId, int memberId)
        {
            int status = _context.Database.ExecuteSqlRaw(
                "DELETE FROM MemberQuest " +
                "WHERE MemberId = @MemberId " +
                "AND QuestId = @QuestId", new SqlParameter[] {
                    new SqlParameter("@MemberId", memberId),
                    new SqlParameter("@QuestId", questId)});

            return Ok();

            /*var memberQuest = await _context.MemberQuest.FindAsync(id);
            if (memberQuest == null)
            {
                return NotFound();
            }

            _context.MemberQuest.Remove(memberQuest);
            await _context.SaveChangesAsync();

            return NoContent();*/
        }

        private bool MemberQuestExists(int id)
        {
            return _context.MemberQuest.Any(e => e.MemberId == id);
        }
    }
}
