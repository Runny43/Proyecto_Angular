using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_de_citas.DatabaseHelper;
using Sistema_de_citas.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Sistema_de_citas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiciosController(AppDbContext context)

        {

            _context = context;

        }

        // GET: api/<ServiciosController>
        [HttpGet]
        public async Task<List<Servicios>> Get()
        {
            List<Servicios> serviceList = new List<Servicios>();
            serviceList = await _context.Servicios.ToListAsync();
            return serviceList;
        }

        // GET api/<ServiciosController>/5
        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {
            var resultado = from x in _context.Servicios where x.Id == id select x;

            return resultado;
        }

        // POST api/<ServiciosController>
        [HttpPost]
        public IActionResult Post([FromBody] Servicios servicios)
        {
            servicios.Id= 0;
            _context.Servicios.Add(servicios);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/<ServiciosController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] Servicios servicio)
        {
            Servicios servicioBuscado = new Servicios();
            servicioBuscado= await _context.Servicios.FindAsync(id);

        }

        // DELETE api/<ServiciosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var resultado= from x in _context.Servicios where x.Id==id select x;

            var eliminacion = resultado.ExecuteDelete();

        }
    }
}
