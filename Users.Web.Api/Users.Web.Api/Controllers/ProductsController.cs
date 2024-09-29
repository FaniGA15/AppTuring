using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Web.Api.Models;

namespace Users.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        public readonly DataContext _context;
        public ProductsController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("crear")]
        public async Task<IActionResult> CrearProducto(Producto product)
        {
            await _context.Productos.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<IEnumerable<Producto>>> ListaProducts()
        {
            var products = await _context.Productos.ToListAsync();
            return Ok(products);
        }
        [HttpGet]
        [Route("ver")]
        public async Task<IActionResult> VerProducto(int id)
        {
            Producto product = await _context.Productos.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarProducto(int id, Producto product)
        {
            var productExistente = await _context.Productos.FindAsync(id);
            productExistente!.Name = product.Name;
            productExistente.Description = product.Description;
            productExistente.Cost = product.Cost;
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var productEliminado = await _context.Productos.FindAsync(id);
            _context.Productos.Remove(productEliminado!);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
