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
            for (int i = 0; i < members.Length; i++) {
                Member member = members[i];
                int status = _context.Database.ExecuteSqlRaw(
                    "UPDATE Member " +
                    "SET Name = @Name, " +
                    "Gender = @Gender, " +
                    "Email = @Email, " +
                    "Address = @Address, " +
                    "Currency = @Currency " +
                    "WHERE Id = @Id", new SqlParameter[] {
                        new SqlParameter("@Name", member.Name), 
                        new SqlParameter("@Gender", member.Gender),
                        new SqlParameter("@Email", member.Email),  
                        new SqlParameter("@Address", member.Address), 
                        new SqlParameter("@Currency", member.Currency),
                        new SqlParameter("@Id", member.Id)});

                IEnumerable<Member> curMember = _context.Member.FromSqlRaw(
                    "SELECT * " +
                    "FROM Member " +
                    "WHERE Id = @Id", new SqlParameter("@Id", member.Id));

                if (curMember.Count() > 0) {
                    result[i] = curMember.ElementAt<Member>(0);
                }
            }

            return result;
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
