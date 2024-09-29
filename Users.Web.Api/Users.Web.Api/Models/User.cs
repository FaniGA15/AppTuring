using System.ComponentModel.DataAnnotations;

namespace Users.Web.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(50, ErrorMessage ="El campo {0} debe tener máximo {1} caracteres.")]

        public string Name { get; set; } = null!;
        public string Rol { get; set; } = null!;
        public string Password { get; set; } = null!;

    }
}
