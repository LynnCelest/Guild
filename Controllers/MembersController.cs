#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Guild;
using Guild.Data;
using Microsoft.Data.SqlClient;
using System.Diagnostics;

namespace Guild.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDBContext _context;

        public MembersController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Member.ToListAsync();
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _context.Member.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // PUT: api/Members
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<ActionResult<IEnumerable<Member>>> PutMembers(Member[] members)
        {
            Member[] result = new Member[members.Length];
            if (members.Length > 0)
            {
                string sqlBegin = "UPDATE mem SET " +
                    "Name = q.Name, " +
                    "Gender = q.Gender, " +
                    "Email = q.Email, " +
                    "Address = q.Address, " +
                    "Currency = q.Currency " +
                    "OUTPUT INSERTED.ID, INSERTED.Name, INSERTED.Gender, INSERTED.EMAIL, INSERTED.Address, INSERTED.Currency, INSERTED.CreatedDateTime " +
                    "FROM Member mem " +
                    "JOIN( VALUES";
                string sqlMid = "";
                string sqlEnd = ") q(Id, Name, Gender, Email, Address, Currency) ON q.Id = mem.Id ";
                SqlParameter[] sqlParameters = new SqlParameter[members.Length * 6];
                for (int i = 0; i < members.Length; i++)
                {
                    Member member = members[i];

                    sqlParameters[i * 6 + 0] = new SqlParameter("@Id" + i, member.Id);
                    sqlParameters[i * 6 + 1] = new SqlParameter("@Name" + i, member.Name);
                    sqlParameters[i * 6 + 2] = new SqlParameter("@Gender" + i, member.Gender);
                    sqlParameters[i * 6 + 3] = new SqlParameter("@Email" + i, member.Email);
                    sqlParameters[i * 6 + 4] = new SqlParameter("@Address" + i, member.Address);
                    sqlParameters[i * 6 + 5] = new SqlParameter("@Currency" + i, member.Currency);

                    sqlMid += " (@Id" + i +
                        ", @Name" + i +
                        ", @Gender" + i +
                        ", @Email" + i +
                        ", @Address" + i +
                        ", @Currency" + i +
                        (i == members.Length - 1 ? ")" : "),");
                }
                return _context.Member.FromSqlRaw(sqlBegin + sqlMid + sqlEnd, sqlParameters).ToList();
            }
            return BadRequest();
        }

        // PUT: api/Members/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member member)
        {
            if (id != member.Id)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
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

        // POST: api/Members
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
            _context.Member.Add(member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.Id }, member);
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Member.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Member.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberExists(int id)
        {
            return _context.Member.Any(e => e.Id == id);
        }
    }
}
