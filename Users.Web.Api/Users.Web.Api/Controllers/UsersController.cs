using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Web.Api.Models;

namespace Users.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        public readonly DataContext _context;
        public UsersController( DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("crear")]
        public async Task<IActionResult>CrearUsuario(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<IEnumerable<User>>> ListaUsers()
        {
            var users= await _context.Users.ToListAsync();
            return Ok(users);
        }
        [HttpGet]
        [Route("ver")]
        public async Task<IActionResult>VerUsuario(int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarUsuario(int id,User user)
        {
            var userExistente = await _context.Users.FindAsync(id);
            if (userExistente == null)
            {
                return NotFound("Usuario no encontrado."); 
            }
            userExistente!.Name = user.Name;
            userExistente.Password = user.Password;
            userExistente.Rol=user.Rol;
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var userEliminado = await _context.Users.FindAsync(id);
            _context.Users.Remove(userEliminado!);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
