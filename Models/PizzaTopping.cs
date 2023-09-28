using System.ComponentModel.DataAnnotations;
namespace ShepherdsPies.Models;
public class PizzaTopping 
{
    public int Id { get; set; }
    [Required]
    public int PizzaId { get; set; }
    public Pizza Pizza { get; set; }
    public int ToppingId { get; set; }
    public Topping Topping { get; set; }
}