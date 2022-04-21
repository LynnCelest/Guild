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
using System.Security.Claims;
using System.Diagnostics;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Guild.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDBContext _context;

        public AccountController(AppDBContext context)
        {
            _context = context;
        }

        // POST api/<AccountController>
        [HttpPost]
        public async Task<ActionResult<Member>> Post(Member member)
        {
            if (User.Identity.IsAuthenticated) await HttpContext.SignOutAsync();
            Member sqlMember;
            IEnumerable<Member> curMember = _context.Member.FromSqlRaw(
                      "SELECT * " +
                      "FROM Member " +
                      "WHERE Id = @Id", new SqlParameter("@Id", member.Id));
            if (curMember.Count() > 0)
            {
                sqlMember = curMember.ElementAt<Member>(0);
                var claims = new List<Claim>();
                claims.Add(new Claim("email", sqlMember.Email));
                claims.Add(new Claim(ClaimTypes.Email, sqlMember.Email));
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                await HttpContext.SignInAsync(claimsPrincipal);
                return sqlMember;
            }
            return Ok();
        }
    }
}
