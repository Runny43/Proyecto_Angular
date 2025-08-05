using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sistema_de_citas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(AppDbContext context, IConfiguration configuration)

        {

            _context = context;
            _configuration = configuration;

        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<List<Users>> Get()
        {
            List<Users> usersList = new List<Users>();
            usersList = await _context.Users.ToListAsync();
            return usersList;
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IQueryable<Users> Get(int id)
        {
            var userLista = from x in _context.Users where x.Id == id select x;
            return userLista;
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] Users user)
        {
             //Id en 0 ya que la base de datos la ingresa de manera auto incrementable
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login( Users user)
        {
            var usuario = await _context.Users.FirstOrDefaultAsync(u => u.email == user.email && u.password == user.password);

            if (usuario == null)
                 return Unauthorized(new{ msg = "Credenciales invalidas" });

            var token = GenerarToken(user.email);
            return Ok(new { token });
        }


        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var userLista = from x in _context.Users where x.Id == id select x;

            var value = userLista.ExecuteDelete();
        }

        private string GenerarToken(string email)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);


        }
    }


}
