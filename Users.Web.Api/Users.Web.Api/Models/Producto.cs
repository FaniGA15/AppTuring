using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Users.Web.Api.Models
{
    public class Producto
    {
        public int Id { get; set; }
        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres.")]
        public string Name { get; set; } = null!;
        [DataType(DataType.MultilineText)]
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres.")]
        public string Description { get; set; } = null!;
        [Column(TypeName = "decimal(18,2)")]
        [DisplayFormat(DataFormatString="{0:C2}")]
        public decimal Cost { get; set;}

    }
}
