using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.DTOs;
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
        [HttpGet("{email}")]
        public IQueryable<Users> Get(string email)
        {
            var userLista = from x in _context.Users where x.email == email select x;
            return userLista;
        }



        // POST api/<UsersController>
        [HttpPost]
        public async Task<ActionResult> Post(RegisterDTO dto)
        {

            if (string.IsNullOrEmpty(dto.email) || string.IsNullOrEmpty(dto.password) || string.IsNullOrEmpty(dto.user_name))
            {
                return BadRequest(new { msg = "Todos los campos son obligatorios" });
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new Users
            {
                email = dto.email,
                password = dto.password, 
                user_name = dto.user_name,
                user_role = dto.user_role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var usuario = await _context.Users.FirstOrDefaultAsync(u => u.email == dto.email && u.password == dto.password);

            if (usuario == null)
                 return Unauthorized(new{ msg = "Credenciales invalidas" });

            var token = GenerarToken(dto.email, usuario.user_role);
            return Ok(new { token});
        }


        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Users users)
        {
            var cambios = await _context.Users.FindAsync(id);

            cambios.Id = users.Id;
            cambios.user_name= users.user_name;
            cambios.email= users.email;
            cambios.password= users.password;
            cambios.user_role= users.user_role;
            try
            {
                await _context.SaveChangesAsync();
                return Ok(cambios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar: {ex.Message}");
            }
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var userLista = from x in _context.Users where x.Id == id select x;

            var value = userLista.ExecuteDelete();
        }

        private string GenerarToken(string email, string user_role)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim("role", user_role),
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
