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

namespace Guild.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestsController : ControllerBase
    {
        private readonly AppDBContext _context;

        public QuestsController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Quests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quest>>> GetQuests()
        {
            return await _context.Quest.Include(q => q.MemberQuests).ThenInclude(mq => mq.Member).ToListAsync();
        }

        // GET: api/Quests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quest>> GetQuest(int id)
        {
            var quest = await _context.Quest.FindAsync(id);

            if (quest == null)
            {
                return NotFound();
            }

            return quest;
        }

        // PUT: api/Quests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Quest>> PutQuest(int id, Quest quest)
        {
            if (id != quest.Id)
            {
                return BadRequest();
            }

            _context.Entry(quest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Quest result = new Quest();
            IEnumerable<Quest> curQuest = _context.Quest.FromSqlRaw(
                "SELECT * " +
                "FROM Quest " +
                "WHERE Id = @Id", new SqlParameter("@Id", id));

            if (curQuest.Count() > 0)
            {
                result = curQuest.ElementAt<Quest>(0);
            }

            return result;
            /*return NoContent();*/
        }

        // POST: api/Quests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quest>> PostQuest(Quest quest)
        {
            _context.Quest.Add(quest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuest", new { id = quest.Id }, quest);
        }

        // DELETE: api/Quests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuest(int id)
        {
            var quest = await _context.Quest.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            _context.Quest.Remove(quest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestExists(int id)
        {
            return _context.Quest.Any(e => e.Id == id);
        }
    }
}
